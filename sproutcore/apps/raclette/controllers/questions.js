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
/** @scope Raclette.question.prototype */
{
    contentBinding: 'Raclette.activityController.questions',
    addQuestion: function() {
        var question;

        console.log("this: (Raclette.activityController)");
        console.log(this);
        // create new question and add it to the list
        question = Raclette.store.createRecord(Raclette.Question, {
            guid: 3,
            prompt: "<your question>"
            /*,
            activity: Raclette.activityController.get('content')*/
        });
        console.log("new question:");
        console.log(question);

        this.addObject(question);
        console.log("this: (Raclette.activityController)");
        console.log(this);
        console.log("new question (should have an activity ref):");
        console.log(question);

        // select new task in UI
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
