var mysql = require('mysql');
var bcrypt = require('bcrypt');
var connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : 'ed',
    database : 'cirinoapp',
    insecureAuth: false
});
connection.connect(function(err){
    if(!err) {
        console.log("Database is connected ... nn");
    } else {
        console.log("Error connecting database ... nn",err);
    }
});

exports.register = function(req,res){
    // console.log("req",req.body);
    var today = new Date();
    //To do bcrypt user password
    // bcrypt.hash(req.body.password, 5, function( err, bcryptedPassword) {

    //save to db
    var users={
        "first_name":req.body.first_name,
        "last_name":req.body.last_name,
        "userid":req.body.userid,
        "password":req.body.password,
        "role":req.body.role,
        "created":today,
        "modified":today
    }
    connection.query('INSERT INTO cirinousers SET ?',users, function (error, results, fields) {
        if (error) {
            console.log("error ocurred",error);
            res.send({
                "code":400,
                "failed":"error ocurred"
            })
        }else{
            //  console.log('The solution is: ', results);
            res.send({
                "code":200,
                "success":"user registered sucessfully"
            });
        }
    });
}

exports.login = function(req,res){
    var userid= req.body.userid;
    var password = req.body.password;
    var role = req.body.role;
    connection.query('SELECT * FROM cirinousers WHERE userid = ?',[userid], function (error, results, fields) {
        if (error) {
            console.log("error ocurred",error);
            res.send({
                "code":400,
                "failed":"error ocurred"
            })
        }else{
            if(results.length >0){
                console.log(results);
                if(results[0].password == req.body.password){
                    if(results[0].role == req.body.role){
                        res.send({
                            "code":200,
                            "success":"login sucessfull"
                        })
                    }
                    else{
                        res.send({
                            "code":204,
                            "success":"You have logged in from wrong user role"
                        })
                    }

                }
                else{
                    console.log(results)
                    res.send({
                        "code":204,
                        "success":"Email and password does not match"
                    })
                }

            }
            else{
                res.send({
                    "code":204,
                    "success":"Email does not exits"
                });
            }
        }
    });
}
