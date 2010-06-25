// ==========================================================================
// Project:   Raclette - mainPage
// Copyright: ©2010 My Company, Inc.
// ==========================================================================
/*globals Raclette */

// This page describes the main user interface for your application.  
Raclette.mainPage = SC.Page.design({

  // The main pane is made visible on screen as soon as your app is loaded.
  // Add childViews to this pane for views to display immediately on page 
  // load.
  mainPane: SC.MainPane.design({
      
    childViews: 'labelView questionsView addQuestionButton'.w(),

    labelView: SC.LabelView.design({
      layout: {
        top: 10,
        left: 10,
        width: 200,
        height: 40
      },
      textAlign: SC.ALIGN_LEFT,
      tagName: "h1",
      valueBinding: 'Raclette.activityController.title'
    }),

    questionsView: SC.ListView.design({
      layout: {
        top: 50,
        width: 120,
        height: 63,
        left: 10
      },
      contentBinding: 'Raclette.questionsController.arrangedObjects',
      selectionBinding: 'Raclette.questionsController.selection',
      contentValueKey: "prompt",
      rowHeight: 21,
      canEditContent: YES,
      canDeleteContent: YES
    }),

    addQuestionButton: SC.ButtonView.design({
      layout: {
        top: 50,
        left: 140,
        height: 80,
        width: 100 
      },
      title: "Add Question",
      target: "Raclette.questionsController",
      action: "addQuestion"
    })
  })
});
