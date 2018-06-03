app.service("loginService",function ($http) {
    this.authenticate = function (obj) {
        return $http.post("http://localhost:63342/login",obj).then(function (posRes) {
            return posRes;
        },function (errRes) {
            return errRes;
        });
    };
});
