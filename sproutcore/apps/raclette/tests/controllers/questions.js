// ==========================================================================
// Project:   Raclette.question Unit Test
// Copyright: ©2010 My Company, Inc.
// ==========================================================================
/*globals Raclette module test ok equals same stop start setupFixtures */

module("Raclette.question", {

  setup: function () {
    console.group('module');
    setupFixtures();
  
    // for unclear reasons, SC.run() doesn't seem to work here or in the test()s that follow. But SC.RunLoop... works
    SC.RunLoop.begin();
    Raclette.activitiesController.set('content', Raclette.store.find(Raclette.Activity));
    SC.RunLoop.end();
    
    this.selectedActivity = Raclette.activitiesController.get('selection').toArray().objectAt(0);   
    
    // activityController.questions => questionsController.content binding should have synchronized in above runloop.
    // We need a second runloop for questionsController.arrangedObjects => questionsView.content binding to sync.

    // This is important because questionsController.addQuestion() throws an error if questionsView's content is null
    // (in interactive scenarios, this second runloop would complete long before the 'add question' button could ever
    // be clicked.)

    SC.RunLoop.begin();
    console.log('Before second runloop end, questionsView.content = ',
      Raclette.mainPage.getPath('mainPane.questionsView.content'));
    SC.RunLoop.end();
    console.log('After second runloop end, questionsView.content = ',
      Raclette.mainPage.getPath('mainPane.questionsView.content'));
  },

  teardown: function () {
    console.groupEnd();
  }
});


// assumes 2 questions in the fixtures
test("Verify questions controller length is updated", function() {
  console.group('test');
  
  // verify initial conditions:
  equals(Raclette.questionsController.get("length"), 2,
    '(precondition:) questionsController.length should be 2 before new question record is created');
  equals(Raclette.activityController.getPath('questions.length'), 2,
    '(precondition:) activityController.questions.length should be 2 before new question record is created');

  // create a new question, but don't associate it with an activity
  SC.RunLoop.begin();
  this.newQuestion = Raclette.store.createRecord(Raclette.Question, {
    prompt: "new question",
    guid: Raclette.Question.nextGuid++
  });
  SC.RunLoop.end();

  // verify the new question doesn't get added to the questionController until its 'activity' property is set
  equals(Raclette.questionsController.get("length"), 2,
    "questionsController.length should still be 2 before 'activity' property is set on new question record");
  equals(Raclette.activityController.getPath('questions.length'), 2,
    "activityController.questions.length should still be 2 before 'activity' property is set on new question record");

  // runLoopHasFinished is a 'tripwire' to prove that the following occurs in the same runloop
  var runLoopHasFinished = NO;
  Raclette.invokeLast(function () {
    runLoopHasFinished = YES;         // this code will be executed before anything else when the next runloop starts.
  });

  this.newQuestion.set("activity", this.selectedActivity);

  // Logic note: if the following assertions were in a different runloop than the above 'set', the invokeLast code would
  // set runLoopHasFinished to YES during the following SC.RunLoop.begin() method call. Therefore, the contrapositive:
  // if runLoopHasFinished is NO, it must be the case that the assertions below and the assignment of the 'activity'
  // property of newQuestion must have occurred in the same runloop.

  SC.RunLoop.begin();

  equals(Raclette.activityController.getPath('questions.length'), 3,
    "activityController.questions.length should be 3 after 'activity' property is set but before runloop finishes");
  equals(Raclette.questionsController.get("length"), 3,
    "questionsController.length should be 3 after 'activity' property is set but before runloop finishes");
  equals(runLoopHasFinished, NO,
    '(validity condition:) runLoopHasFinished should be NO, showing the runloop had not finished when above tests ran');

  SC.RunLoop.end();

  SC.RunLoop.begin();
  equals(runLoopHasFinished, YES,
    '(validity condition:) runLoopHasFinished should be YES after runloop finishes, confirming that it really does ' +
    'get set when runloop ends');
  SC.RunLoop.end();
  
  console.groupEnd();
});


test("Verify record state before and after commit (using addQuestion)", function () {
  console.group('test');
  // check where the record is going to be added
  var guid = Raclette.Question.nextGuid;
  equals(guid, 3, '(pre-test:) expected nextGuid to be 3');

  equals(Raclette.questionsController.get("length"), 2, "expected 2 questions before call to addQuestion()");

  Raclette.questionsController.addQuestion();

  equals(Raclette.questionsController.get("length"), 3, "expected 3 questions after call to addQuestion()");
  equals(Raclette.store.find(Raclette.Question, guid).get('status'), SC.Record.READY_NEW,
    'expected state of question 3 after addQuestion() to be READY_NEW');
  equals(this.selectedActivity.get('status'), SC.Record.READY_DIRTY,
    'expected state of current activity after addQuestion() to be READY_DIRTY');


  SC.RunLoop.begin();
  
  Raclette.store.commitRecords();

  equals(Raclette.store.find(Raclette.Question, guid).get('status'), SC.Record.READY_NEW,
    'expected state of question 3 after commitRecords() but before runloop ends to be READY_NEW');
  equals(this.selectedActivity.get('status'), SC.Record.READY_DIRTY,
    'expected state of current activity after commitRecords() but before runloop ends to be READY_DIRTY');

  SC.RunLoop.end();

  equals(Raclette.store.find(Raclette.Question, guid).get('status'), SC.Record.READY_CLEAN,
    'expected state of question 3 after commitRecords() and end of runloop to be READY_CLEAN');
  equals(this.selectedActivity.get('status'), SC.Record.READY_CLEAN,
    'expected state of current activity after commitRecords() and end of runloop to be READY_CLEAN');
  console.groupEnd();
});


test('Verify record state before and after commit (adding new question ourselves)', function () {
  console.group('test');
  var runLoopHasFinished = NO;
  Raclette.invokeLast(function () {
    runLoopHasFinished = YES;         // this code will be executed before anything else when the next runloop starts.
  });
  
  this.newQuestion = Raclette.store.createRecord(Raclette.Question, {
    prompt: "new question",
    guid: Raclette.Question.nextGuid++
  });
  
  equals(this.newQuestion.get('status'), SC.Record.READY_NEW, 
    'the state of the new question record should be READY_NEW after createRecord() and before commitRecords()');
  equals(this.selectedActivity.get('status'), SC.Record.READY_CLEAN, 
   'the state of the current activity should be READY_CLEAN before the new question is associated with it');  

  this.newQuestion.set("activity", this.selectedActivity);  
  SC.RunLoop.begin();   // again, if above and below code were in different runloops, the invokeLast() would execute here.

  equals(this.selectedActivity.get('status'), SC.Record.READY_DIRTY,
    'the state of the current activity should be be READY_DIRTY immediately after the new question is assigned to it');
  equals(runLoopHasFinished, NO, 
    "(validity condition:) runLoopHasFinished should be NO, showing the above test took place in the same runloop " +
    "as the assignment of the 'activity' property of the new question");

  Raclette.store.commitRecords();
  SC.RunLoop.end();

  equals(this.newQuestion.get('status'), SC.Record.READY_CLEAN,
    'the state of the new question record should be READY_CLEAN after commitRecords()');
  equals(this.selectedActivity.get('status'), SC.Record.READY_CLEAN,
    'the state of the current activity should be READY_CLEAN after commitRecords()');
  equals(runLoopHasFinished, YES,
    '(validity condition:) runLoopHasFinished should be YES, indicating that it is reset when runloop starts.');
  console.groupEnd();
});
