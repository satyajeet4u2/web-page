app.controller("aboutController",function($scope,homeService){
    homeService.staticData().then(function(res){
        $scope.result = res;
    });
});