
const express = require('express');
const app = express();

var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }))


app.set("view engine" , "pug");

const mongodb = require('monk')('localhost:27017/urjadbs');

// show records in browser
app.get("/showdata_mongo",(req,res)=>{
    
    mongodb.get('users').find().then(function(result){
        //console.log(result);
        res.render('mongoview',{mydata:result});
    })
})

//insert records
app.get("/add_record",(req,res)=>{
    res.render("add_record_page");
})

app.post("/form-action-mongodb",(req,res)=>{
    console.log(req.body);
    mongodb.get('users').insert(req.body).then(function(result){
        //console.log(result)
       
        res.redirect("/showdata_mongo");
    })
})

app.listen(3000);