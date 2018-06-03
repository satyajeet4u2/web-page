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