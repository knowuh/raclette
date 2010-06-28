// ==========================================================================
// Project:   Raclette.question
// Copyright: ©2010 My Company, Inc.
// ==========================================================================
/*globals Raclette */

/** @class

  (Document Your Controller Here)

  @extends SC.Object
*/

Raclette.questionsController = SC.ArrayController.create(
/** @scope Raclette.question.prototype */ {

  contentBinding: 'Raclette.activityController.questions',

  addQuestion: function () {
    var question;

    // create new question and add it to the list
    question = Raclette.store.createRecord(Raclette.Question, {
      guid: Raclette.Question.nextGuid++,     // see fixtures/question.js
      prompt: "<your question>"
      // // this would work too (you have to pass a serializable hash to createRecord):
      // activity: Raclette.activityController.get('guid')
      // // this does NOT work (you can't pass a model object to createRecord):
      // activity: Raclette.activityController.get('content')
      // // this does not work either:
      // activity: 'Raclette.activityController.content'
    });

    // add the question to 'this' which, remember, proxies the 'questions' property of the current Activity

    this.pushObject(question);

    // question.set('activity', Raclette.activityController.get('content'));     // works too.
    // Raclette.activityController.get('questions').pushObject(question);        // works too.

    var activity = question.get('activity');

    // select the new question in UI
    this.selectObject(question);

    // activate inline editor once UI can repaint
    this.invokeLater(function() {
      var contentIndex = this.indexOf(question);
      var list = Raclette.mainPage.getPath('mainPane.questionsView');
      var listItem = list.itemViewForContentIndex(contentIndex);
      listItem.beginEditing();
    });

    return YES;
  }
});
