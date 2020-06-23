var express = require('express');
const fileUpload = require('express-fileupload');
var path = require('path');
var mysql = require('./connection');
var queries = require('./queries');

var store =(path.join(__dirname,'upload'));

var router = express.Router();

router.get ('/allUsers',async(req,res)=>{
    var [users] = await (mysql.pool.query(queries.getUser))
   res.send(users)
    
})

router.post('/update',async(req,res)=>{
    var id =req.body.id;
    var name= req.body.name;
    var address = req.body.address;
    var phoneNumber=req.body.phoneNumber;
    var email = req.body.email;
     var data= await (mysql.pool.query(queries.updateUser,[name,address,phoneNumber,email,id]));
     console.log (data);

})

router.post('/newaccount',async (req,res)=>{
    var name= req.body.name;
    var address = req.body.address;
    var phoneNumber=req.body.phoneNumber;
    var email = req.body.email;
var data=await mysql.pool.query(queries.createUser,[name,address,phoneNumber,email]);
res.send(data[0]);

})

router.delete ('/removeUser',async(req,res)=>{
    var statement = await mysql.ps(queries.deleteUser,[req.query.id]);
   var x= await (mysql.pool.query(statement))
 res.send(x);
    
})

router.post('/upload',(req,res)=>{

let sampleFile = req.files.sampleFile;
var filename=sampleFile.name;


 sampleFile.mv('./upload/'+filename,(err)=>{
     if (err){
         console.log(err);
     }
     else{
         res.send({status:200})
     }
 })
})


module.exports=router;

