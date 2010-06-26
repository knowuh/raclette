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
        if (query === Raclette.ACTIVITIES_QUERY) {
            var request = SC.Request.getUrl('/rails/activities.json').header({
                'Accept': 'application/json'
            }).json().notify(this, 'didFetchActivities', store, query);
            //console.log("sending request:");
            //console.log(request);
            request.send();
            return YES;
        }
        console.log("query:");
        console.log(query);
        console.log("did NOT === Raclette.ACTIVITIES_QUERY:");
        console.log(Raclette.ACTIVITIES_QUERY);
        return NO; // return YES if you handled the query
    },

    didFetchActivities: function(response, store, query) {
        console.log("response:");
        console.log(response);
        if (SC.ok(response)) {
			console.log("response.get('body').content:");
			console.log(response.get('body').content);
            store.loadRecords(Raclette.Activity, response.get('body').content);
			console.log("didFetchActivities about to call store.dataSourceDidFetchQuery(query);");
            store.dataSourceDidFetchQuery(query);
        } else store.dataSourceDidErrorQuery(query, response);
    },

    // ..........................................................
    // RECORD SUPPORT
    // 
    retrieveRecord: function(store, storeKey) {

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
