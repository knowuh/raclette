// ==========================================================================
// Project:   Raclette.activitiesController Unit Test
// Copyright: ©2010 My Company, Inc.
// ==========================================================================
/*globals Raclette module test ok equals same stop start setupFixtures */

module("Raclette.activitiesController", { 
  setup: function () {
    console.group('module setup');
    setupFixtures();
  },
  
  teardown: function () {
    console.groupEnd();
  }
});

test("verify that activitiesController sets its selection automatically when its content is set", function() {
  
  
  var activityArray = Raclette.store.find(Raclette.Activity);
  Raclette.activitiesController.set('content', activityArray);
  var numActivities = Raclette.activitiesController.get('length');
  
  var selectedActivity = Raclette.activitiesController.get('selection').toArray().objectAt(0);
  var firstActivity = Raclette.activitiesController.objectAt(0);

  equals(selectedActivity, firstActivity, "activitiesController's selection should be the first activity " + 
    "immediately after its content is set to an array of 2 activities");

  var secondActivity = Raclette.activitiesController.objectAt(1);
  Raclette.activitiesController.selectObject(secondActivity);
  selectedActivity = Raclette.activitiesController.get('selection').toArray().objectAt(0);

  equals(Raclette.activitiesController.getPath('selection.length'), 1, 'activitiesController should only have a single ' +
    'selected object after selectObject() is called with the second activity');
  equals(selectedActivity, secondActivity, 'activitiesController selection should be the second object after ' +
    'selectObject() is called with the second activity');
  
  // add an object and check that selection isn't changed when new object is created
  SC.RunLoop.begin();
  var newActivity = Raclette.store.createRecord(Raclette.Activity, {
    guid: Raclette.Activity.nextGuid++,
    questions: []
  });
  SC.RunLoop.end();
  
  selectedActivity = Raclette.activitiesController.get('selection').toArray().objectAt(0);
  equals(Raclette.activitiesController.get('length'), numActivities+1, '(double-check:) activitiesController.length ' +
    'should increase by one when a new activity record is created');
  equals(selectedActivity, secondActivity, 'activitiesController selection should not be reset (should still be ' +
    'the second object) after a new Activity is added to activitiesController');

  SC.RunLoop.begin();
  var query = SC.Query.local(Raclette.Activity, {
    conditions: "guid = 1 OR guid = 3",
    orderBy: 'guid ASC'
  });
  Raclette.activitiesController.set('content', Raclette.store.find(query));
  SC.RunLoop.end();
  
  equals(Raclette.activitiesController.get('length'), 2, 'activitiesController length should be 2 after content is ' +
    'reassigned.');
  ok(Raclette.activitiesController.indexOf(selectedActivity) === -1, '(validity condition:) previously selected activity ' +
    'should not be present in activitiesController array after content property is reassigned');
  selectedActivity = Raclette.activitiesController.get('selection').toArray().objectAt(0);

  equals(selectedActivity, firstActivity, 'activitiesController selection should be reset to firstActivity when content ' +
    'property is reassigned in a way that invalidates previous selection');
});


test('verify that activitiesController unsets its selection when its content is set to an empty array', function () { 
  var activityArray = Raclette.store.find(Raclette.Activity);
  Raclette.activitiesController.set('content', activityArray);
  
  equals(Raclette.activitiesController.getPath('selection.length'), 1, 'activitiesController selection length should ' +
    'be 1 after its content is set to a non-empty RecordArray');

  Raclette.activitiesController.set('content', []);
  equals(Raclette.activitiesController.getPath('selection.length'), 0, 'activitiesController selection length should ' +
    'be 0 after its content is set to an empty array');
});


