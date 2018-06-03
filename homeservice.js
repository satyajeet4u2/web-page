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