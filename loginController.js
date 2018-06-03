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