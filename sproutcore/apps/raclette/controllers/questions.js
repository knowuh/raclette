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
  addQuestion: function() {
      var question;
      debugger;
      // create new question and add it to the list
      question = Raclette.store.createRecord(Raclette.Question, { 
        prompt: "<your question>"
      });
      
      question.set('activity',Raclette.activityController.get('content'));
      
      // select new task in UI
      this.selectObject(question); 

      // activate inline editor once UI can repaint
      this.invokeLater(function() {
        var contentIndex = this.indexOf(question);
        var list = Raclette.mainPage.getPath('mainPane.questionsView');
        var listItem = list.itemViewForContentIndex(contentIndex);
        listItem.beginEditing();
      });

      return YES ;
  }
}) ;
