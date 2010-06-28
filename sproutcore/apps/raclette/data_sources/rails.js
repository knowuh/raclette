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
/** @scope Raclette.RailsDataSource.prototype */
{

  // ..........................................................
  // QUERY SUPPORT
  //
  fetch: function(store, query) {
    console.group('Raclette.RailsDataSource.fetch()');

    if (query === Raclette.ACTIVITIES_QUERY) {
      console.log('query === Raclette.ACTIVITIES_QUERY', query);
      var request = SC.Request.getUrl('/rails/activities.json').header({
        'Accept': 'application/json'
      }).json().notify(this, 'didFetchActivities', store, query);

      console.log('request.address: %s', request.address);
      console.log('request: ', request);
      request.send();
      console.groupEnd();

      return YES;
    }

    console.log('query !== Raclette.ACTIVITIES_QUERY', query);
    console.groupEnd();
    return NO; // return YES if you handled the query
  },

  didFetchActivities: function(response, store, query) {
    console.group('Raclette.RailsDataSource.didFetchActivities()');

    console.log('response.status = %d', response.get('status'));
    console.log("response: ", response);

    if (SC.ok(response)) {
      console.log('SC.ok(response) is YES; processing content');
      var content = response.get('body').content;
      console.log('response.body.content: ', content);

      console.group('store.loadRecords(Raclette.Activity, content)');
      store.loadRecords(Raclette.Activity, content);
      console.groupEnd();

      console.group("store.dataSourceDidFetchQuery(query)");
      store.dataSourceDidFetchQuery(query);
      console.groupEnd();
    } else store.dataSourceDidErrorQuery(query, response);

    console.groupEnd();
  },

  // ..........................................................
  // RECORD SUPPORT
  //
  retrieveRecord: function(store, storeKey) {
    
    var guid = store.idFor(storeKey)
    console.log('retrieveRecord: guid: ' + guid);

    // TODO: Add handlers to retrieve an individual record's contents
    // call store.dataSourceDidComplete(storeKey) when done.
    return NO; // return YES if you handled the storeKey
  },

  createRecord: function(store, storeKey) {

    // TODO: Add handlers to submit new records to the data source.
    // call store.dataSourceDidComplete(storeKey) when done.
    return NO; // return YES if you handled the storeKey
  },

  updateRecord: function(store, storeKey) {

    // TODO: Add handlers to submit modified record to the data source
    // call store.dataSourceDidComplete(storeKey) when done.
    return NO; // return YES if you handled the storeKey
  },

  destroyRecord: function(store, storeKey) {

    // TODO: Add handlers to destroy records on the data source.
    // call store.dataSourceDidDestroy(storeKey) when done
    return NO; // return YES if you handled the storeKey
  }

});
