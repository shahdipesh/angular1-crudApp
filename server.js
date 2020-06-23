var express = require('express');
const fileUpload = require('express-fileupload');
var path = require('path');
var mysql = require('./connection');
var queries = require('./queries');


var router=require('./router');

var app=express();

app.use(fileUpload());

app.use(express.json())

app.use(express.static(path.join(__dirname,'views','webpages')));

app.use('/',router);



app.listen(3000,()=>console.log("Server running on port 3000"))