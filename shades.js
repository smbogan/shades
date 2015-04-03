Boards = new Mongo.Collection("boards");


if (Meteor.isClient) {
  // counter starts at 0
  Session.setDefault('page', 'home');

  Template.main.helpers({
    template: function() { return Session.get('page'); },
    data: { }
  });

  Template.navigation.helpers({
    isActive: function(page) {
      if(page === Session.get('page')) {
        return 'active';
      }
      return '';
    }
  });

  Template.navigation.events({
    'click .home-nav': function() { Session.set('page', 'home'); }
  });

  Template.home.events({
    'click .gotowallaby': function() {
      Session.set('page', 'wallaby');
    }
  });

  Template.boardslist.helpers({
    boards: function() {
      return Boards.find({});
    }
  });
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}
