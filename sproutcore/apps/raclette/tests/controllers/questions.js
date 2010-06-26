// ==========================================================================
// Project:   Raclette.question Unit Test
// Copyright: ©2010 My Company, Inc.
// ==========================================================================
/*globals Raclette module test ok equals same stop start */

module("Raclette.question", { setup: setupFixtures });

// TODO: Replace with real unit test for Raclette.question
test("test description", function() {
  var expected = "test";
  var result   = "test";
  equals(result, expected, "test should equal test");
});

// assume 2 questions in the fixtures
test("Verify questions controller length is updated", function() {
  var firstActivity;
  
  SC.run(function(){
    firstActivity = Raclette.store.find(Raclette.Activity,'1');
    Raclette.activityController.set('content',firstActivity);
  });
  
  // verify initial conditions:
  equals(Raclette.questionsController.get("length"), 2, "expected 2 questions (check fixtures)");
  
  SC.run(function(){
    var newQuestion = Raclette.store.createRecord(Raclette.Question,{
      prompt: "new question"
    });
    newQuestion.set("activity",firstActivity);
  });
  
  equals(firstActivity.getPath("questions.length"), 3, "expected 3 questions after add in model");
  equals(Raclette.questionsController.get("length"), 3, "expected 3 questions after add in controller");
  
  
});