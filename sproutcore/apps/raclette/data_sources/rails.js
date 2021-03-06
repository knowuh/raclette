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

  _jsonGet: function(url, callback, params){
    // replace the url with 'this'
    // so we can pass the params to notify
    params = SC.A(arguments).slice(1);
    params.unshift(this);
    
    var request = SC.Request.getUrl(url + '.json').header({
      'Accept': 'application/json'
    }).json();
    request.notify.apply(request, params);
    
    console.log('request.address: %s', request.address);
    console.log('request: ', request);
    request.send();
  },

  // ..........................................................
  // QUERY SUPPORT
  //
  fetch: function(store, query) {
    console.group('Raclette.RailsDataSource.fetch()');

    if (query === Raclette.ACTIVITIES_QUERY) {
      console.log('query === Raclette.ACTIVITIES_QUERY', query);
      this._jsonGet('/rails/activities', 'didFetchActivities', store, query);
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
    console.log('Raclette.RailsDataSource.retrieveRecord');
    // guid will be rails url e.g. /rails/questions/1
    var guid = store.idFor(storeKey);
    
    this._jsonGet(guid, 'didRetrieveRecord', store, storeKey);
    
    return YES; // return YES if you handled the storeKey
  },
  
  didRetrieveRecord: function(response, store, storeKey) {
    console.group('Raclette.RailsDataSource.didRetrieveRecord()');

    console.log('response.status = %d', response.get('status'));
    console.log("response: ", response);

    if (SC.ok(response)) {
      console.log('SC.ok(response) is YES; processing content');
      var content = response.get('body').content;
      console.log('response.body.content: ', content);

      console.group('store.dataSourceDidComplete(storeKey, content)');
      store.dataSourceDidComplete(storeKey, content);
      console.groupEnd();
    } else store.dataSourceDidError(storeKey);

    console.groupEnd();
  },

  createRecord: function(store, storeKey) {
    var recordType = store.recordTypeFor(storeKey);
    var modelName = recordType.modelName;
    var modelHash = {};
    modelHash[modelName] = store.readDataHash(storeKey);
    delete modelHash[modelName]['guid'];    // remove guid property before sending to rails

    console.group('Raclette.RailsDataSource.createRecord()');
    SC.Request.postUrl('/rails/' + recordType.modelsName).header({
                    'Accept': 'application/json'
                }).json()

          .notify(this, this.didCreateRecord, store, storeKey)
          .send(modelHash);
    console.groupEnd();
    return YES;
  },
  
  didCreateRecord: function(response, store, storeKey) {
    if (SC.ok(response)) {
      // Adapted from parseUri 1.2.2
      // (c) Steven Levithan <stevenlevithan.com>
      // MIT License
      var parser = /^(?:(?![^:@]+:[^:@\/]*@)([^:\/?#.]+):)?(?:\/\/)?((?:(([^:@]*)(?::([^:@]*))?)?@)?([^:\/?#]*)(?::(\d*))?)(((\/(?:[^?#](?![^?#\/]*\.[^?#\/.]+(?:[?#]|$)))*\/?)?([^?#\/]*))(?:\?([^#]*))?(?:#(.*))?)/;
      var url = parser.exec(response.header('Location'))[8];
      store.dataSourceDidComplete(storeKey, null, url); // update url

    } else store.dataSourceDidError(storeKey, response);
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
