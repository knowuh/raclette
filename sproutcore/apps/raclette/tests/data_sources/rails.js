// ==========================================================================
// you can run these tests directly here:
//
// http://localhost:4020/raclette/en/current/tests/models/activity.html
//
// ==========================================================================
/*globals Raclette module test ok equals same stop start statusEquals statusNotify*/

// { setup: store: SC.Store.create().from('Raclette.RailsDataSource') }

module("Raclette.RailsDataSource", { 
  setup: function() {
    this.store = SC.Store.create().from('Raclette.RailsDataSource');
    Raclette.set('store', this.store); 
  }
});

// NOTE: 
test("does the source that core.js associates with Racllete store exists", function() {
  // setup a spy
  var fetchCalled = false;
  var railsDataSource = this.store._getDataSource();
  // reassign fetch prop to new function
  railsDataSource.fetch = function() {
    fetchCalled = true;
  };
  var activities = Raclette.store.find(Raclette.ACTIVITIES_QUERY);
  ok(activities instanceof SC.RecordArray, 'activities should be a SC.RecordArray');
  ok(fetchCalled, 'the fetch method was called which means our Rails datasource is being called');
});

test("does the source that core.js associates with Racllete store exists", function() {
  var activities = Raclette.store.find(Raclette.ACTIVITIES_QUERY);
  statusEquals(activities, SC.Record.BUSY_LOADING, 'Activities should be loading');
  
  stop();       // pause to wait for async call
  
  // when status of activities changes, we expect it to be clean
  // and that we have at least one activity
  var checkActivitiesExist = function(){
      // remove the observer incase the passed func causes it to fire again
      activities.removeObserver('status', checkActivitiesExist);
      statusEquals(activities, SC.Record.READY_CLEAN, "Next state was clean");
      ok(activities.get('length') > 0, 'we should have at least one activity after the activities become "clean"');
      start();
  };
  activities.addObserver('status', checkActivitiesExist);
  
});
