// ==========================================================================
// you can run these tests directly here:
//
// http://localhost:4020/raclette/en/current/tests/models/activity.html
//
// ==========================================================================
/*globals Raclette module test ok equals same stop start */

module("Raclette.Activity", { setup: setupFixtures });

// TODO: Replace with real unit test for Activity
test("test description", function() {
  var expected = "test";
  var result   = "test";
  equals(result, expected, "test should equal test");
});

// NOTE: Assumes contents of fixtures.
test("test two questions in first model", function() {
  var expectedSize = 2;
  var activity   = Raclette.store.find('Raclette.Activity',1);
  var numQuestions = activity.get('questions').get('length');
  equals(numQuestions, expectedSize, "There should be 2 questions");
});