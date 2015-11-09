Cats = new Mongo.Collection('cats');

if (Meteor.isClient) {
  angular.module('issue-793',['angular-meteor']);

  angular.module('issue-793').controller('TestCtrl', ['$scope', '$meteor',
    function ($scope, $meteor) {

      var id = Cats.findOne({ name: 'Dinah'})._id;
      $scope.cat = $meteor.object(Cats, id, false);

      $scope.save = function() {
        $scope.cat.save();
      };

      $scope.deleteActivity = function(activity) {
        $scope.cat.activities.splice($scope.cat.activities.indexOf(activity), 1);
      }

      $scope.deleteNote = function(activity,note) {
        $scope.cat.activities[$scope.cat.activities.indexOf(activity)].notes.splice(activity.notes.indexOf(note), 1);
      }
    }]);
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    var catId = Cats.findOne({"name": 'Dinah'});
    var activities = [{
      name:'biting',
      notes: ['rarely draws blood', 'often after purring']
    }, {
      name:'purring',
      notes: ['don\'t be fooled', 'will bite if pet for too long']
    }, {
      name:'scratching',
      notes: ['rarely draws blood', 'often after purring']
    }];

    if (!catId) {
      Cats.insert({
        name: 'Dinah',
        activities: activities
      });
    }
    else {
      Cats.update({ name: 'Dinah' }, {$set: {activities : activities }})
    }
  });
}
