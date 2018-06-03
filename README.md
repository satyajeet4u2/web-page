# Dynamic Web-page

//creat database

create database mini_project
use mini_project ;
create table login_details(uname varchar(20),upwd varchar(20)) ;
insert into login_details values('admin','admin') ;
select *from login_details ;
create table about(sno integer, type varchar(20),priority integer) ;
insert into about values(1,'traing',1) ;
insert into about values(2,'devlopment',2) ;
insert into about values(3,'placment',3) ;
insert into about values(4,'service',4) ;
select *from about ;

     //monogodb database
     
mongod                                         // for connecting to server
mongo                                         // connected to server through a port number
use mini_project ;
db.createCollection("protfolio")
db.protfolio.insert({'cno':1,'cname':'angularjs','cpriority':2}) ;
db.protfolio.insert({'cno':2,'cname':'nodejs','cpriority':1}) ;
db.protfolio.insert({'cno':3,'cname':'mongodb','cpriority':3}) ;
db.protfolio.insert({'cno':4,'cname':'reactjs','cpriority':4}) ;
db.protfolio.find();     

//implament bower.json


{
  "name":"mini project",
  "dependencies":{
    "angular":"latest",
    "angular-ui-router": "~0.2.18",
    "ngstorage":"latest",
    "bootstrap": "latest"
  }
}


// implament packege.json

{
  "name": "mini_project",
  "version": "0.0.1",
  "dependencies": {
    "express": "4.16.2",
    "mysql": "^2.15.0",
    "mongodb": "2.2.33",
    "body-parser": "^1.18.2",
    "jwt-simple": "^0.5.1"
  }
}





 //implament app.js
  
 var app = angular.module("app",["ui.router","ngStorage"]);
 
 //implament the controllers
 
 
 
 app.controller("homeController",function($scope,homeService){
    homeService.mongoDBData().then(function(res){
        $scope.result = res;
    });
});


app.controller("aboutController",function($scope,homeService){
    homeService.staticData().then(function(res){
        $scope.result = res;
    });
});

app.controller("contactController",function($scope,homeService){
    homeService.mongoDBData().then(function(res){
        $scope.result = res;
    });
});

app.controller("loginController",function ($scope,loginService,$localStorage,$location) {
    $scope.login_details={};
    $scope.login = function () {
        loginService.authenticate($scope.login_details).then(function (res) {
            if(res.data.login=="success"){
                $localStorage.token = res.data.token;
                $location.path("/home");
            }else{
                alert("Login Fail !");
            }
        });
    };
});


// Call the Services


app.service("homeService",function($http,$localStorage){
    this.staticData = function(){
        return $http.post("http://localhost:63342/static",
            {"token":$localStorage.token}).then(function(posRes){
            return posRes.data.products;
        },function(errRes){
            return errRes;
        });
    }
    this.mySQLData = function(){
        return $http.post("http://localhost:63342/mysql",
            {"token":$localStorage.token}).then(function(posRes){
            return posRes.data;
        },function(errRes){
            return errRes;
        });
    }
    this.mongoDBData = function(){
        return $http.post("http://localhost:63342/mongodb",
            {"token":$localStorage.token}).then(function(posRes){
            return posRes.data;
        },function(errRes){
            return errRes;
        });
    }
});


app.service("loginService",function ($http) {
    this.authenticate = function (obj) {
        return $http.post("http://localhost:63342/login",obj).then(function (posRes) {
            return posRes;
        },function (errRes) {
            return errRes;
        });
    };
});




// implament config.js

function run($rootScope,$location,$localStorage) {
    $rootScope.$on("$stateChangeStart", function (event) {
        if (!$localStorage.token) {
            $location.path("/login");
        }
    });
};

app.run(run).config(function ($stateProvider,$urlRouterProvider) {
    $stateProvider.state("login",{
        url:"/login",
        templateUrl:"templates/login.html",
        controller:"loginController"
    })
        .state("home",{
            url:"/home",
            templateUrl:"templates/home.html",
            controller:"homeController"
        })
        .state("home.static",{
            url:"/static",
            templateUrl:"templates/about.html",
            controller:"aboutController"
        })
        .state("home.mysql",{
            url:"/mysql",
            templateUrl:"templates/portfolio.html",
            controller:"portfolioController"
        })
        .state("home.mongodb",{
            url:"/mongodb",
            templateUrl:"templates/contact.html",
            controller:"contactController"
        });
    $urlRouterProvider.otherwise("/login");
});




// Login Form Html


<!DOCTYPE html>
<html lang="en" ng-app="app">

<body>
<form class="form-group" ng-submit="login()">
    <div class="form-group">
        <label>Uname.</label>
        <input type="text" class="form-control" ng-model="login_details.uname">
    </div>

    <div class="form-group">
        <label>Upwd.</label>
        <input type="password" class="form-control" ng-model="login_details.upwd">
    </div>

    <div class="form-group">
        <input type="submit" class="btn btn-primary">
    </div>

</form>

<div ng-include="'templates/table.html'"></div>



<table border="1">
    <tr>
        <th>id</th>
        <th>name</th>
        <th>cost</th>
    </tr>

    <tr ng-repeat="x in result">
        <td>{{x.p_id}}</td>
        <td>{{x.p_name}}</td>
        <td>{{x.p_cost}}</td>
    </tr>



<a ui-sref=".static"><b>About</b></a> &emsp;&emsp;&emsp;&emsp;&emsp;
<a ui-sref=".mysql"><b>Protfolio</b></a>&emsp;&emsp;&emsp;&emsp;&emsp;
<a ui-sref=".mongodb"><b>Contact</b></a>&emsp;&emsp;&emsp;&emsp;&emsp;
<button ng-click="logout()">Logout</button>
<br><br>
<div ui-view></div>


</body>


<head>
    <title>mini_project</title>
    <div ng-controller="ctrl"></div>
<script src="services/loginservice.js"></script>
<script src="services/homeservice.js"></script>
<script src="bower_components/ngstorage/ngStorage.min.js"></script>
<link rel="stylesheet" href="bower_components/bootstrap/dist/css/bootstrap.css">
<script src="bower_components/angular-ui-router/release/angular-ui-router.min.js"></script>
<script src="bower_components/angular/angular.min.js"></script>
<script src="controllers/protfolioController.js"></script>
<script src="controllers/loginController.js"></script>
<script src="controllers/homeController.js"></script>
<script src="controllers/contactController.js"></script>
<script src="controllers/aboutController.js"></script>
<script src="server.js"></script>
<script src="config.js"></script>
<script src="app.js"></script>
</head>
</html>



