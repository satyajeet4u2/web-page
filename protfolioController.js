app.controller("portfolioController",function($scope,homeService){
    homeService.mySQLData().then(function(res){
        $scope.result = res;
    });
});