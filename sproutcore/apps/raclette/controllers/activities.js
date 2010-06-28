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

  allowsMultipleSelection: NO,
  
  // forces the activityController to refresh its 'questions' ManyArray when the content object changes, even if
  // the selection left over from the old content object is valid with the new content object.
  updateSelectionAfterContentChange: function () {
    console.group('Raclette.activitiesController.updateSelectionAfterContentChange');

    var selection = this.get('selection').toArray();
    var selectedObject = selection.get('length') > 0 ? selection.objectAt(0) : null;
    var indexOfSelectedObject = selectedObject ? this.indexOf(selectedObject) : -1;
    
    if (this.get('length') > 0) {
      if (indexOfSelectedObject >= 0) {
        // re-select the current selection if it's valid
        console.log('selecting selected object');
        this.selectObject(this.objectAt(indexOfSelectedObject));
      }
      else {
        // if the selection isn't found in the content, select the first object
        console.log('selecting first object');
        this.selectObject(this.objectAt(0));
      }
    }
    else {
      console.log('selecting empty selection');
      this.set('selection', SC.SelectionSet.create());
    }

    sc_super();
    console.groupEnd();
  }

}) ;
