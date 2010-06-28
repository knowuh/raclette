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
    var len;
    console.group('Raclette.activityController.questionsDidChange');
    if (questions && (len = questions.get('length')) > 0) {
      console.info('SUCCESS: activityController.questions.length = %d', len);
      console.log('activityController.questions (converted to js array): ', questions.toArray());
    }
    console.groupEnd();
  }.observes('*questions.[]')

}) ;
