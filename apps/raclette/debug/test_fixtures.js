var setupFixtures = function () {
    Raclette.Activity.FIXTURES = [{
        guid: 1,
        title: 'Wheels of Cheese',
        questions: [1,2]
    }];
    Raclette.Question.FIXTURES = [{
        guid: 1,
        prompt: "What color is the sky?",
        activity: 1
      },
      {
        guid: 2,
        prompt: "What color is dirt?",
        activity: 1
    }];
    // debugger;
    Raclette.store.find(Raclette.Question);
    Raclette.store.find(Raclette.Activity);
    // Raclette.set("store",SC.Store.create().from(SC.Record.fixtures));
};
