// ==========================================================================
// Project:   Raclette.RailsDataSource
// Copyright: ©2010 My Company, Inc.
// ==========================================================================
/*globals Raclette */

/** @class

  cribbed from
  http://wiki.sproutcore.com/Todos+07-Hooking+Up+to+the+Backend

  @extends SC.DataSource
*/

sc_require('models/activity');
Raclette.ACTIVITIES_QUERY = SC.Query.local(Raclette.Activity, {
  orderBy: 'title'
});


Raclette.RailsDataSource = SC.DataSource.extend(
/** @scope Raclette.RailsDataSource.prototype */ {

  // ..........................................................
  // QUERY SUPPORT
  // 

  fetch: function(store, query) {
    debugger;
    if (query === Raclette.ACTIVITIES_QUERY) {
       SC.Request.getUrl('/rails/activities.json').header({'Accept': 'application/json'}).json()
         .notify(this, 'didFetchTasks', store, query)
         .send();
       return YES;
     }
    return NO ; // return YES if you handled the query
  },


  didFetchTasks: function(response, store, query) {
    debugger;
    if (SC.ok(response)) {
      store.loadRecords(Raclette.Activity, response.get('body').content.getEach('activity'));
      store.dataSourceDidFetchQuery(query);
    } else store.dataSourceDidErrorQuery(query, response);
  },
  
  // ..........................................................
  // RECORD SUPPORT
  // 
  
  retrieveRecord: function(store, storeKey) {
    
    // TODO: Add handlers to retrieve an individual record's contents
    // call store.dataSourceDidComplete(storeKey) when done.
    
    return NO ; // return YES if you handled the storeKey
  },
  
  createRecord: function(store, storeKey) {
    
    // TODO: Add handlers to submit new records to the data source.
    // call store.dataSourceDidComplete(storeKey) when done.
    
    return NO ; // return YES if you handled the storeKey
  },
  
  updateRecord: function(store, storeKey) {
    
    // TODO: Add handlers to submit modified record to the data source
    // call store.dataSourceDidComplete(storeKey) when done.

    return NO ; // return YES if you handled the storeKey
  },
  
  destroyRecord: function(store, storeKey) {
    
    // TODO: Add handlers to destroy records on the data source.
    // call store.dataSourceDidDestroy(storeKey) when done
    
    return NO ; // return YES if you handled the storeKey
  }
  
}) ;
