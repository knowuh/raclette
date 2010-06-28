// ==========================================================================
// Project:   Raclette.activitiesController
// Copyright: ©2010 My Company, Inc.
// ==========================================================================
/*globals Raclette */

/** @class

  (Document Your Controller Here)

  @extends SC.Object
*/
Raclette.activitiesController = SC.ArrayController.create(
/** @scope Raclette.activitiesController.prototype */ {

  allowsEmptySelection: NO,
  allowsMultipleSelection: NO,

  // forces the activityController to refresh its 'questions' ManyArray when the content object changes, even if
  // the selection left over from the old content object is valid with the new content object.
  _contentDidChange: function () {
    console.group('Raclette.activitiesController._contentDidChange');
    this.selectObject(this.objectAt(0));
    console.groupEnd();
  }.observes('content')

}) ;
