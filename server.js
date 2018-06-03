var express= require("express");
var mysql   = require("mysql");
var mongodb = require("mongodb");
var jwt     = require("jwt-simple");
var bodyparser= require("body-parser")
var fs= require("fs");

var app= express();
app.use(express.static(__dirname+"/../mini_project"));
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({"extended":false}));



var connection =mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "root",
    database: "mini_project"

});
connection.connect();
var tokens= [];

app.post("/login",function (req,res) {
    var a_uname = req.body.uname;
    var a_upwd  = req.body.upwd;
    connection.query("select * from login_details where uname='"+a_uname+"'",
        function (err,recordsArray,fields) {
            if(recordsArray.length>0){
                var token = jwt.encode({'uname':a_uname,'upwd':a_upwd},'hr@tcs.in');
                tokens.push(token);
                res.send({"login":"success","token":token});
            }else{
                res.send({"login":"fail"});
            });
}
});

app.post("/static", function(req,res){
    var token = req.body.token;
    if(tokens[0]  ==  token){
        fs.readFile(__dirname+"/static.json", function(err,data){
            res.send(data);
        });
    }else{
        res.status(404).send(404);
    }
});

app.post("/mysql", function(req,res){
    var token = req.body.token;
    if(tokens[0]  ==  token){
        connection.query("select * from products" ,
            function(err,recordsArray,fields){
                res.send(recordsArray);
            });
    }else{
        res.status(404).send(404);
    }
});
var nareshIT = mongodb.MongoClient;
app.post("/mongodb", function(req,res){
    var token = req.body.token;
    if(tokens[0]  ==  token){
        nareshIT.connect("mongodb://localhost:27017/poc",function(err,db){
            db.collection("products").find().toArray(function(err,array){
                res.send(array);
            }
        });
    }else{
        res.status(404).send(404);
    }
});
app.listen(8080);
console.log("server listening the port no.8080");

