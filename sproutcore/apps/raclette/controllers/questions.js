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
//        console.group('Raclette.questionsController.addQuestion()');

        var question;

        // create new question and add it to the list
        question = Raclette.store.createRecord(Raclette.Question, {
            guid: Raclette.Question.nextGuid++,         // see fixtures/question.js
            prompt: "<your question>"
            //activity: Raclette.activityController.get('guid')       // this works. Best approach?
            //activity: Raclette.activityController.get('content')  // this does not work.
            //activity: 'Raclette.activityController.content'       // this does not work either.
        });

        // add the question to 'this' which, remember, proxies the 'questions' property of the current Activity
        // console.group('questionsController.pushObject()');
        //     console.log('Before: question.activity.guid = %s', question.getPath('activity.guid'));
            this.pushObject(question);                                                      // second best approach?
            //question.set('activity', Raclette.activityController.get('content'));         // works too.
            //Raclette.activityController.get('questions').pushObject(question);              // works too.
        //     console.log('After: question.activity.guid = %s', question.getPath('activity.guid'));
        // console.groupEnd();
        
        var activity = question.get('activity');
        
        // Commits the record. Not required for the UI to work but usefully demonstrates the change of the records' status.
        // A single call to commitRecords would normally suffice here; it will execute after the runloop.
        // console.group('Raclette.store.commitRecords()');
        //     SC.run( function () {
        //         console.log('Before: activity = %s', activity.toString());
        //         console.log('Before: question = %s', question.toString());    
        //         Raclette.store.commitRecords();
        //         console.log('Immediately after: activity = %s', activity.toString());
        //         console.log('Immediately after: question = %s', question.toString());                   
        //     });
        //     console.log('After runloop: activity = %s', activity.toString());
        //     console.log('After runloop: question = %s', question.toString());           
        // console.groupEnd();
        
        // select new task in UI
        this.selectObject(question);

        // activate inline editor once UI can repaint
        this.invokeLater(function() {
            var contentIndex = this.indexOf(question);
            var list = Raclette.mainPage.getPath('mainPane.questionsView');
            var listItem = list.itemViewForContentIndex(contentIndex);
            listItem.beginEditing();
        });     

//        console.groupEnd();
        return YES;
    }
});
