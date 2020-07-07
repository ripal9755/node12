const express = require("express");
const mySqlConnection = require("./connection");
const app = express();

app.listen(5000);
app.use(express.urlencoded({ extended: false }))

app.get("/login", (req, res) => {
    res.render("login.ejs")
});

app.get("/register", (req, res) => {
    res.render("register.ejs");
})

app.post("/login", (req, res) => {
    console.log("in  post")
    var id=req.body.emailId;
    var password=req.body.password;
    console.log(password)
    mySqlConnection.query("select * from student where email='"+id+"'" ,(err,row,field) => {    
if(!err){
    console.log(row);
    
    var dbPassword=row[0].password;
    console.log(dbPassword);
    
    
    if(password==dbPassword){

        
     res.send("Welcome "+ row[0].name)
    }
    else{
        res.send("Check passwordor emailId");
    }
}
else{
    console.log(err);
    
}
    })


})


app.post("/register", (req, res) => {

    var name = req.body.name;

    var id = Date.now().toString();
    var email = req.body.emailId;
    var password = req.body.password;
    console.log(name + id + " " + password);

    mySqlConnection.query("insert into `node12`.`student` (`name`, `id`,`email`,`password`) VALUES ('" + name + "','" + id + "','" + email + "','" + password + "')", (err, result, field) => {
        if (!err) {
            res.send("Registered Successfully" + name);
        }
        else {
            res.send("err")
        }
    })
})

app.get("/getAllList", (req, res) => {

    mySqlConnection.query("select * from student", (err, row, field) => {
        if (!err) {
            res.send(row)
        }
        else {
            res.send(err);
        }
    })

})