/*globals module test ok equals same testAfterPropertyChange*/

var obj;

module("stausQueue", { 
  setup: function() {
    obj = SC.Object.create({status: 0}); 
  }
});

test("testAfterPropertyChange calls callback", function(){
  expect(1);

  setTimeout(function(){
    obj.set('status', 1);
  }, 100);

  testAfterPropertyChange(obj, 'status', function(){
    ok(true, 'callback was called');    
  });
});

test("testAfterPropertyChange fails when callback throws exception", function(){
  expect(1);
  var oldOk = ok;
  var okCalledWithFalse = false;
  ok = function(condition){
    if(!condition){
      okCalledWithFalse = true;
    }
  };
  
  var wasCalled = false;
  testAfterPropertyChange(obj, 'status', function(){
      var bad = null;
      bad.get('something');
    });
  
  setTimeout(function(){
    try {
      obj.set('status', 1);
    } catch (e) {
      // testAfterPropertyChange throws exceptions all the way up so our exception will end up here      
    }
    // reset oldOk
    ok = oldOk;
    equals(true, okCalledWithFalse, "The ok method was called with a false condition after an exception was thrown");
  }, 100);
});

test("testAfterPropertyChange handles nesting", function(){
  expect(4);
  
  setTimeout(function(){
    ok(true, 'first timeout was called');
    obj.set('status', 1);
  }, 100);  
  
  testAfterPropertyChange(obj, 'status', function(){
    ok(true, 'callback was called first time');
    setTimeout(function(){
      ok(true, 'second timeout was called');
      obj.set('status', 2);
    }, 100);
    testAfterPropertyChange(obj, 'status', function(){
      ok(true, 'callback was called second time');
    });
  });  
});

test("testAfterPropertyChange handles exceptions in first level", function(){
  expect(6);
  
  var oldOk = ok;
  var okCalledWithFalse = false;
  ok = function(condition, message){
    if(!condition){
      okCalledWithFalse = true;
    } else {
      oldOk(condition, message);
    }
  };
  
  setTimeout(function(){
    ok(true, 'first timeout was called');
    try {
      obj.set('status', 1);
    } catch (e) {
      // our observer should throw an exception
      // and log an error
    }
    ok = oldOk;
    equals(true, okCalledWithFalse, "The ok method was called with a false condition after an exception was thrown");    
  }, 100);  
  
  testAfterPropertyChange(obj, 'status', function(){
    ok(true, 'callback was called first time');
    setTimeout(function(){
      ok(true, 'second timeout was called');
      equals(1, obj._kvo_observers_status.getMembers().length, 'observer is still added to status');
      obj.set('status', 2);
    }, 100);
    testAfterPropertyChange(obj, 'status', function(){
      console.log('callback was called second time');
      ok(true, 'callback was called second time');
    });
    throw 'fake exception';
  });  
});

