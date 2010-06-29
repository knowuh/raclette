// ==========================================================================
// you can run these tests directly here:
//
// http://localhost:4020/raclette/en/current/tests/models/activity.html
//
// ==========================================================================
/*globals Raclette module test ok equals same stop start statusEquals statusNotify*/

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

test("we create a new activity on the server when we create activity", function() {
  var activities = Raclette.store.find(Raclette.ACTIVITIES_QUERY);
   statusEquals(activities, SC.Record.BUSY_LOADING, 'Activities should be loading');

   stop();       // pause to wait for async call

   // when status of activities changes, we expect it to be clean
   // and that we have at least one activity
   var checkActivitiesExist = function(){
       // remove the observer incase the passed func causes it to fire again
       activities.removeObserver('status', checkActivitiesExist);
       statusEquals(activities, SC.Record.READY_CLEAN, "activities state was clean");
       var numActivities = activities.get('length');
       console.log('we have '+numActivities+' activities at start');
       
       var newActivity;
       SC.run(function() {
         newActivity = Raclette.store.createRecord(Raclette.Activity, {
           title: "A new activity"
         });
       });
       console.log('newActivity = '+newActivity);
       
       var checkAddedActivityPending = function() {
        console.log('checkAddedActivityPending');
        newActivity.removeObserver('status', checkAddedActivityPending);
        statusEquals(newActivity, SC.Record.READY_CLEAN, "newActivity state was clean");
        
        var checkAddedActivity = function() {
          console.log("checkAddedActivity called");
          activities.removeObserver('status', checkAddedActivity);
          statusEquals(activities, SC.Record.READY_CLEAN, "activities state was clean");
          
          equals(activities.get('length'), numActivities + 1, "We have one more activity than we had before");
          
          start();
        };
        if (activities.get('status') !== SC.Record.READY_CLEAN) {  
          activities.addObserver('status', checkAddedActivity);
        }
        else {
          checkAddedActivity();
        }
       };
       newActivity.addObserver('status', checkAddedActivityPending);
   };
   activities.addObserver('status', checkActivitiesExist);
  
});