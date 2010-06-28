// ==========================================================================
// Project:   Raclette
// Copyright: ©2010 My Company, Inc.
// ==========================================================================
/*globals Raclette */

// This is the function that will start your app running.  The default
// implementation will load any fixtures you have created then instantiate
// your controllers and awake the elements on your page.
//
// As you develop your application you will probably want to override this.
// See comments for some pointers on what to do next.
//

Raclette.main = function main() {

  console.group('Raclette.main()');

  // Step 1: Instantiate Your Views
  // The default code here will make the mainPane for your application visible
  // on screen.  If you app gets any level of complexity, you will probably
  // create multiple pages and panes.
  Raclette.getPath('mainPage.mainPane').append() ;

  // Step 2. Set the content property on your primary controller.
  // This will make your app come alive!

  var activities = Raclette.store.find(Raclette.ACTIVITIES_QUERY);

  console.log('activities: ', activities);
  console.log('activities.length: ', activities.get('length'));

  // The following will not work as desired because 'activities' is not (and could not possibly be) updated with the
  // response from the server until after the XHR callback is allowed to execute. (Unless we use synchronous XHR...)
  // Therefore 'activities' will always be empty in the following code, and no association will be formed between
  // the 'content' property of activityController and the activities SC.RecordArray
  
  // var firstActivity = activities.get('length') ? activities.objectAt(0) : null;   // popObject() returns LAST Activity
  // console.log('firstActivity:', firstActivity);
  // console.group("Raclette.activityController.set('content',firstActivity)");
  // Raclette.activityController.set('content',firstActivity);
  // console.groupEnd();     // controller.set('content', ...)


  // the following works as desired because the activities RecordArray is updated by the data store when the 
  // data source calls Raclette.store.loadRecords() in the XMLHttpRequest callback. The activitiesController observes
  // this property, and updates its 'selection' property appropriately; and the activityController observes that...
  
  Raclette.activitiesController.set('content', activities);

  console.groupEnd();     // main()
} ;

function main() { Raclette.main(); }
