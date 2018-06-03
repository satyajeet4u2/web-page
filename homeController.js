app.controller("homeController",function($scope,homeService){
    homeService.mongoDBData().then(function(res){
        $scope.result = res;
    });
});