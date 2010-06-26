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

  contentDidChange: function () {
    console.group('Raclette.activitiesController.contentDidChange');

    var content = this.get('content');
    if (content) {
      console.log('content.length: ', content.get('length'));
      console.log('content: ', content);
      if (content.get('length') > 0) {
        console.log('length > 0, setting selection to ', content.objectAt(0));
        this.selectObject(content.objectAt(0));
      }
    }
    else {
      console.log('content is null');
    }
    
    console.groupEnd();    
  }.observes('[]')    // '[]' is the Sproutcore key meaning 'observe the contents, not merely the identity, of this array'

}) ;
