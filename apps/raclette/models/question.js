// ==========================================================================
// Project:   Raclette.Question
// Copyright: ©2010 My Company, Inc.
// ==========================================================================
/*globals Raclette */

/** @class

  (Document your Model here)

  @extends SC.Record
  @version 0.1
*/
Raclette.Question = SC.Record.extend(
/** @scope Raclette.Question.prototype */ {
  prompt: SC.Record.attr(String),
  activity: SC.Record.toOne('Raclette.Activity')
  // TODO: Add your own code here.

}) ;
