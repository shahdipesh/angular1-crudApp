var app = angular.module("myapp", ["ngRoute"]);

app.controller("ctrl1", ($scope, $http) => {
   var ctrl = this;
   $scope.displayForm=true;
   $scope.displayUsers=true;
   $scope.user={};
    $scope.userInfo = [],

    $scope.newAccount=function(){
      $scope.displayForm=true;
      $scope.user={};
    }

    $scope.hideUsers= function(){
      $scope.userInfo = [];
      $scope.displayUsers=true;
    }

    $scope.edit= function(user){
      $scope.displayForm=true;
      $scope.user = user;
    }

    $scope.update=function(user){
      $http.post("http://localhost:3000/update",user)
      .then((res)=>{console.log(res)});
    }


    $scope.fetch = function () {
      $http.get("http://localhost:3000/allUsers").then((response) => {
        $scope.userInfo = response.data;
        $scope.displayUsers=false;
        $scope.displayForm=false;
      });
    };

  $scope.delete = function (id) {
    $http
      .delete(`http://localhost:3000/removeUser?id=${id}`)
      .then((response) => {
        console.log(response);
        $scope.fetch();
      });
  };


  $scope.signUp = function (user) {
    $http.post(`http://localhost:3000/newAccount`, user).then((res) => {
      if (res.status === 200) {
        $scope.fetch();
         $scope.displayForm=false;
      }
    });
  };

  $scope.upsert = function (user) {
    if (user.id){
      $scope.update(user);
      console.log("Inside if")
    }
    else{
   $scope.signUp(user);
   console.log("Inside else")
  }
  };
});


app.config(function($routeProvider) {
   $routeProvider
      .when('/signup', {
			templateUrl: 'form.html'
      })
      .when('/users', {
        templateUrl: 'table.html'
        })
        .when('/photos', {
          templateUrl: 'photos.html'
          })
          .when('/edit', {
            templateUrl: 'form.html'
            })
});
