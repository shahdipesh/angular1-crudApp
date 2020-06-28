var express = require('express');
const fileUpload = require('express-fileupload');
var path = require('path');
var mysql = require('./connection');
var queries = require('./queries');
const moment = require('moment');

var store =(path.join(__dirname,'upload'));

var router = express.Router();

router.get('/search',async (req,res)=>{
    var name= req.query.value;
   var [data] = await (mysql.pool.query(queries.searchUser,['%'+name+'%','%'+name+'%']));
   res.send(data);
})

router.post('/savefamilyform',async(req,res)=>{

console.log("=======>",req.body);

    var fullName=req.body.fullName;
    var email =req.body.email;
    var workPhone=req.body.workPhone;
    var homePhone=req.body.homePhone;
    var homeAddress1= req.body.homeAddress1;
    var homeAddress2=req.body.homeAddress2;
    var city=req.body.city;
    var address=req.body.address;
    var postalCode=req.body.postalCode;
    var locationCampus =req.body.location.campus;
    var locationHealthSystem =req.body.location.health;
    var  occupationType=req.body.occupationType;
    var birthDate =(moment(req.body.birthDate)).format('YYYY-MM-DD');
    var gender=req.body.gender;
    var maritalStatus =req.body.maritalStatus;

var [data]=await (mysql.pool.query(queries.saveFamilyForm,[fullName,email,workPhone,homePhone,homeAddress1,homeAddress2,city,address,postalCode,occupationType,gender,maritalStatus,birthDate,locationCampus,locationHealthSystem]))
res.send(data[0])
})



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

