// ==========================================================================
// Project:   Raclette.Activity
// Copyright: ©2010 My Company, Inc.
// ==========================================================================
/*globals Raclette */

/** @class

  (Document your Model here)

  @extends SC.Record
  @version 0.1
*/
Raclette.Activity = SC.Record.extend(
/** @scope Raclette.Activity.prototype */ {
  title: SC.Record.attr(String),
  questions: SC.Record.toMany('Raclette.Question',{
    inverse: 'activity'
  })
  // TODO: Add your own code here.

}) ;
