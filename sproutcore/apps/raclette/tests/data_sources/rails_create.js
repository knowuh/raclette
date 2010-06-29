// ==========================================================================
// you can run these tests directly here:
//
// http://localhost:4020/raclette/en/current/tests/models/activity.html
//
// ==========================================================================
/*globals Raclette module test ok equals same stop start statusEquals statusNotify testAfterPropertyChange*/

// { setup: store: SC.Store.create().from('Raclette.RailsDataSource') }

module("Raclette.RailsDataSource_create", { 
  setup: function() {
    this.store = SC.Store.create({
      commitRecordsAutomatically: YES
    }).from('Raclette.RailsDataSource');
    
    Raclette.set('store', this.store); 
  }
});

test("createRecord is called on activity creation", function() {
  // setup a spy
   var createRecordCalled = false;
   var railsDataSource = this.store._getDataSource();
   // reassign fetch prop to new function
   railsDataSource.createRecord = function() {
     createRecordCalled = true;
   };
  
  SC.run(function() {
    var activity = Raclette.store.createRecord(Raclette.Activity, {
      title: "A new activity"
    });
  });
  
  ok(createRecordCalled, "Create record was called after activity creation");
});


test("we create a new activity on the server when we create activity", function () {

  var activities; // make it global

  activities = Raclette.store.find(Raclette.ACTIVITIES_QUERY);

  statusEquals(activities, SC.Record.BUSY_LOADING, 'Activities RecordArray should be BUSY_LOADING immediately after find');
   
  testAfterPropertyChange(activities, 'status', function () {
    statusEquals(activities, SC.Record.READY_CLEAN, "activities RecordArray's next status should be READY_CLEAN");

    var numActivities = activities.get('length');
    console.log('we have ' + numActivities + ' activities at start');

    var newActivity;
    SC.run(function () {
      newActivity = Raclette.store.createRecord(Raclette.Activity, {
        title: "A new activity",
        guid: 'tempguid'
      });
    });
    console.log('newActivity = ' + newActivity);
    
    equals(newActivity.get('id'), 'tempguid', "newActivity id should be 'tempguid'");
    
    statusEquals(activities, SC.Record.READY_CLEAN, "activities should be in READY_CLEAN state immediately after create");
    statusEquals(newActivity, SC.Record.BUSY_CREATING, "newActivity should be in BUSY_CREATING state immediately after createRecord");

    activities.refresh();

    statusEquals(activities, SC.Record.BUSY_REFRESH, 'activities should be in BUSY_REFRESH state after refresh');
    statusEquals(newActivity, SC.Record.BUSY_CREATING, 'newActivity should still be in BUSY_CREATING after refresh');
    
    testAfterPropertyChange(activities, 'status', function () {
      // this is not that we expect this for any particular reason, but it is what we consistently observe:
      statusEquals(activities, SC.Record.BUSY_REFRESH, "activities's next state should be BUSY_REFRESH");
      
      testAfterPropertyChange(activities, 'status', function () {
           
        var testThatOneActivityWasAdded = function () {     // there could be a helper for this pattern
          statusEquals(activities, SC.Record.READY_CLEAN, 
            "activities state should be READY_CLEAN before number of activities is tested.");
          
          statusEquals(newActivity, SC.Record.READY_CLEAN, 
            "newActivity state should be READY_CLEAN before number of activities is tested.");

          var newNumActivities = activities.get('length');      
          equals(newNumActivities, numActivities+1, 
            'Number of old activities should be old number of activities (' + numActivities + ') + 1');
          ok(newActivity.get('id') !== 'tempguid', "newActivity should no longer have id 'tempguid' (it has " + newActivity.get('id') + ")");
        };
        
        if (newActivity.get('status') !== SC.Record.READY_CLEAN) {
          testAfterPropertyChange(newActivity, status, testThatOneActivityWasAdded);
        }
        else {
          testThatOneActivityWasAdded();
        }
      });
    });
  });
});