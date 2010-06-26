// ==========================================================================
// Project:   Raclette.activityController
// Copyright: ©2010 My Company, Inc.
// ==========================================================================
/*globals Raclette */

/** @class

  (Document Your Controller Here)

  @extends SC.Object
*/
Raclette.activityController = SC.ObjectController.create(
/** @scope Raclette.activityController.prototype */ {

  contentBinding: 'Raclette.activitiesController.selection',
  
  // not needed for functionality, but log success for everyone's edification
  questionsDidChange: function () {
    var questions = this.get('questions');
    if (questions && questions.get('length') > 0) {
      console.info('LENGTH OF activityController.questions > 0!');
      console.log('activityController.questions (converted to js array): ', questions.toArray()); 
    }
  }.observes('*questions.[]')

}) ;
