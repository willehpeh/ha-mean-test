var app = angular.module('app');

app.controller('MainCtrl', function($scope, $http) {

  var getProjets = function() {
    $http.get("/projets/").then(function(res) {
      $scope.projets = [];
      for(i = 0; i < res.data.length; i++) {
        var projet = res.data[i];
        $scope.projets.push(projet);
      }
    });
  }

  getProjets();

  $scope.newProjet = {};

  $scope.addProjet = function() {
    if($scope.newProjet._id) {
      $http.put("/projets/" + $scope.newProjet._id, $scope.newProjet).then(function() {
        $scope.newProjet = {};
        getProjets();
      });
    } else {
      $http.post("/projets/create/", $scope.newProjet).then(function() {
        $scope.newProjet = {};
        getProjets();
      });
    }
  }

  $scope.modifyProjet = function(projet) {
    $http.get("/projets/" + projet._id).then(function(res) {
      $scope.newProjet = res.data;
    });
  }

  $scope.deleteProjet = function(projet) {
    console.log("Deleting project " + projet._id);
    $http.delete("/projets/" + projet._id).then(function() {
      getProjets();
    });
  }

});
