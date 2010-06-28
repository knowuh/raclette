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

test("do we get activities back from rails", function() {
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

test("does the first activity returned have questions", function() {
  var activities = Raclette.store.find(Raclette.ACTIVITIES_QUERY);
  
  stop();       // pause to wait for async call
  
  // when status of activities changes, we expect it to be clean
  // and that we have at least one activity
  var checkActivityHasQuestions = function(){
      // remove the observer incase the passed func causes it to fire again
      activities.removeObserver('status', checkActivityHasQuestions);
      var firstActivity = activities.objectAt(0);
      var questions = firstActivity.get('questions');
      ok(questions.get('length') > 0, 'we have at least one question');
      start();
  };
  activities.addObserver('status', checkActivityHasQuestions);
  
});

test("verify retrieveRecord is called when first related object is requested", function() {
  // setup a spy
   var retrieveCalledFor = null;
   var railsDataSource = this.store._getDataSource();
   // reassign fetch prop to new function
   railsDataSource.retrieveRecord = function(store, storeKey) {
     retrieveCalledFor = store.recordTypeFor(storeKey);
   };
  
  var activities = Raclette.store.find(Raclette.ACTIVITIES_QUERY);
  
  stop();       // pause to wait for async call
  
  // 
  var checkRetrieveRecordCalled = function(){
      // remove the observer incase the passed func causes it to fire again
      activities.removeObserver('status', checkRetrieveRecordCalled);
      equals(retrieveCalledFor, null, "retrieve should not have been called on the questions yet");
      
      SC.RunLoop.begin();
      SC.RunLoop.end();
      equals(retrieveCalledFor, null, "retrieve should still not have been called on the questions");
      
      var firstActivity = activities.objectAt(0);
      
      SC.RunLoop.begin();
      SC.RunLoop.end();
      equals(retrieveCalledFor, null, "retrieve should still not have been called on the questions");
      
      var questions = firstActivity.get('questions');
      
      SC.RunLoop.begin();
      SC.RunLoop.end();
      equals(retrieveCalledFor, null, "retrieve should still not have been called on the questions");
      
      var firstQuestion = questions.objectAt(0);
      
      equals(retrieveCalledFor, Raclette.Question, "retrieve should have been called when we ask for the first question, before the run loop");
      
      
      start();
  };
  activities.addObserver('status', checkRetrieveRecordCalled);
  
});
