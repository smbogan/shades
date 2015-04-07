
var username = "smbogan";

/*
{
  _id,
  [u]sername: "jschmoe",
  [n]ame: "Joe Schmoe",
  [p]ermissions: "Aa" (A => administrator, a => API access),
}
*/
Users = new Mongo.Collection("users");

/*
{
  _id,
  [n]ame: "An Organization Name",
  [t]eams: {
    _id,
    [n]ame: "Team Name",
    [u]sers: [
      {
        [u]sername: "jschmoe",
        [p]ermissions: "" (r => read, w => write )
      }, {...}, ...
    ],
  },
  [b]oards: {
    _id,
    [n]ame: "Board Name",
    [t]ags: [...]
  }
}
*/
Organizations = new Mongo.Collection("organizations");

/*
{
  [n]ame: "Sprint Name",
  [s]tate: "p/o/f/c"  (planning, active, finished, closed),
  [b]oards: [...ids...]
}
*/
Sprints = new Mongo.Collection("sprints");

/*
{
  _id,
  [t]itle: "Store Title",
  [d]escription: "Description",
  doneness_[c]riteria: "Doneness Text",
  ta[g]s: [...],
  stat[u]s: "u/g/c" (ungroomed, groomed, completed),
  [p]oints: 45
  tas[k]s: [
    {
      [t]itle: "Task Title",
      [h]ours: 30,
    }, ...
  ]
}
*/
Stories = new Mongo.Collection("stories");

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

  });

  Template.boardslist.helpers({
    boards: function() {
      return Boards.find({});
    }
  });
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    Meteor.publish("Users", function() {
      var currentUser = Users.findOne({name: username});
      if(currentUser) {
        if(currentUser.p.indexOf("A") >= 0) {
          return Users.fetch({});
        } else {
          return Users.find({name: username});
        }
      } else {
        return null;
      }
    });
  });
}
