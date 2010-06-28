/*globals statusEquals statusNotify */      // make jslint happy

// Helper function to convert status number to a string
// this was taken from SC.Record#statusString
SC.Record.mixin({
  statusString: function(status) {
    var ret = [];

    for(var prop in SC.Record) {
      if(prop.match(/[A-Z_]$/) && SC.Record[prop]===status) {
        ret.push(prop);
      }
    }

    return ret.join(" ");  
  }
});

// Helper function to make it easier to track down status errors
statusEquals = function(obj, status, message){
  equals(SC.Record.statusString(obj.get('status')), SC.Record.statusString(status), message);	
};

// Helper function to notify for a particular status
// it will call func immediately if the status matches
statusNotify = function(obj, status, func){
  // suspend property change notifications so we can atomically check if the status is changed
  // this should make the method more thread safe
  obj.beginPropertyChanges();

  if(obj.get('status') & status){
    console.log('statusNotify firing synchronously');
    func.call();
    
    // resume property change notifications
    obj.endPropertyChanges();	
    return;
  }
  
  var checkingFunc = function(){
    if(obj.get('status') & status){
      // remove the observer incase the passed func causes it to fire again
      obj.removeObserver('status', checkingFunc);
      func.call();
    }
  };
  obj.addObserver('status', checkingFunc);

  // resume property change notifications
  // this should make the method more thread safe
  obj.endPropertyChanges();	
};
