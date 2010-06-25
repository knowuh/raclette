// ==========================================================================
// Project:   Raclette.question Unit Test
// Copyright: ©2010 My Company, Inc.
// ==========================================================================
/*globals Raclette module test ok equals same stop start setupFixtures */

module("Raclette.question", { 
  setup: function () {
    console.group('module setup');
    setupFixtures();
    this.firstActivity = Raclette.store.find(Raclette.Activity,1);
    
    SC.run(function() {
      Raclette.activityController.set('content', this.firstActivity);
    });
  },
  
  teardown: function () {
    console.groupEnd();
  }
});

// assume 2 questions in the fixtures
test("Verify questions controller length is updated", function() {
  
  // verify initial conditions:
  equals(Raclette.questionsController.get("length"), 2, "expected 2 questions (check fixtures)");

  SC.run(function() {
    this.newQuestion = Raclette.store.createRecord(Raclette.Question, {
      prompt: "new question",
      guid: Raclette.Question.nextGuid++
    });
    this.newQuestion.set("activity", this.firstActivity);
  });
  
  equals(this.firstActivity.getPath("questions.length"), 3, "expected 3 questions after add in model");
  equals(Raclette.questionsController.get("length"), 3, "expected 3 questions after add in controller");
});

// this might have to be changed if we set store to commitRecordsAutomatically
test("Verify record state before and after commit (using addQuestion)", function () {
  // check where the record is going to be added
  var guid = Raclette.Question.nextGuid;
  equals(guid, 3, '(pre-test:) expected nextGuid to be 3');
    
  equals(Raclette.questionsController.get("length"), 2, "expected 2 questions before call to addQuestion");
  Raclette.questionsController.addQuestion();
  equals(Raclette.questionsController.get("length"), 3, "expected 3 questions after call to addQuestion");

  equals(Raclette.store.find(Raclette.Question, guid).get('status'), SC.Record.READY_CLEAN, 
    'expected state of question 3 after addQuestion to be READY_CLEAN');
  equals(this.firstActivity.get('status'), SC.Record.READY_CLEAN, 
    'expected state of activity 1 after addQuestion to be READY_CLEAN');
});

test('Verify record state before and after commit (executing commitRecords within the test.)', function () {

  SC.run(function () {
    this.newQuestion = Raclette.store.createRecord(Raclette.Question, {
      prompt: "new question",
      guid: Raclette.Question.nextGuid++
    });
    this.newQuestion.set("activity", this.firstActivity);
  });
  
  equals(this.newQuestion.get('status'), SC.Record.READY_NEW, 'expected state of this.newQuestion to be READY_NEW');
  equals(this.firstActivity.get('status'), SC.Record.READY_DIRTY, 'expected state of this.firstActivity to be READY_DIRTY');
  
  SC.run(function () {
    Raclette.store.commitRecords();
  });
  
  //debugger;
  
  equals(this.newQuestion.get('status'), SC.Record.READY_CLEAN, 
    'expected state of this.newQuestion after commit to be READY_CLEAN');
  equals(this.firstActivity.get('status'), SC.Record.READY_CLEAN, 
    'expected state of this.firstActivity after commit to be READY_CLEAN');
});
