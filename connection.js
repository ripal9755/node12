const  mysql=require("mysql");

var createConnection=mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"root",
    database:"node12",
    multipleStatements:true
})

createConnection.connect((err)=>{
    if(!err){
console.log("Connected tothe node12 database");

    }
    else{
    console.log(err);
    
    }
})

module.exports=createConnection;