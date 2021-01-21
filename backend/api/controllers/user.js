const mongoose = require("mongoose");
const bcrypt = require('bcrypt');
const User = require("../models/user");
const jwt = require('jsonwebtoken');

const { success, error, validation } = require("../helpers/responseApi");
exports.user_signup = (req, res, next) => {
    User.find({ email: req.body.email })
        .exec()
        .then(user => {
            if (user.length > 0) {
                return res.status(409).json(error("User already exists", res.statusCode));
            }
            else {
                bcrypt.hash(req.body.password, 10, (err, hash) => {
                    if (err) {
                        res.status(500).json(error("Something went wrong", res.statusCode));
                    }
                    else {
                        const user = new User({
                            
                            email: req.body.email,
                            userRole:req.body.userRole,
                            password: hash
                           
                        });
                        user.save()
                            .then(doc => {
                                res.status(201).json(success("User created",doc,res.statusCode));
                            })
                            .catch(err => {
                                res.status(500).json(error("Something went wrong", res.statusCode))
                            });
                    }

                });
            }
        })
}


  exports.user_login = (req,res,next)=> {
    User.find({email: req.body.email})
    .exec()
    .then(user => {
        if (user.length < 1) 
        {
          return res.status(404).json(error("Unauthorised attempt", res.statusCode));
        }
         bcrypt.compare(req.body.password, user[0].password, (err, result) => {
            if (err) {
                 return res.status(401).json(error("Unauthorised attempt", res.statusCode));
                }
                if (result) {
                    const token = jwt.sign({
                        email: user[0].email,
                        userId: user[0]._id
                    },
                        process.env.JWT_KEY,
                        {
                            expiresIn: '1h'
                        }
                    )

                    return res.status(200).json(success("Login successfully",token,res.statusCode));
                }
                return res.status(401).json(error("Unauthorised attempt", res.statusCode));
            });
         
       })
    .catch(err => {
        res.status(500).json(error("Something went wrong", res.statusCode));
    });
  }
exports.user_get_all = (req,res,next)=>{
    User.find()
    .select("email password userRole conformPassword ")
    .exec()
    .then(docs => {
        const response ={
            count: docs.length,
            user: docs.map(doc =>{
                return{
                    _id: doc._id,
                    email: doc.email,
                    password:doc.password,
                    userRole:doc.userRole,
                    
                    
                    request: {
                        type: 'GET',
                        url: 'http://localhost:3000/user/'+doc._id
                    }
                }
            })
        };
       
       res.status(200).json(success("OK",response,res.statusCode));
    })
    .catch((err) => {
        res.status(500).json(error("Something went wrong", res.statusCode));
      });
} 

  exports.users_get_user = (req , res ,next)=>{
    User.findById(req.params.userId)
    .exec()
    .then(user => {
        if(!user){
            res.status(404).json(error("User Not found", res.statusCode));
        }
            const response = {
                user: user,
               request: {
                  type: 'GET',
                  url: 'http://localhost:3000/user/'
                }
            };
        
        res.status(200).json(success("OK",response,res.statusCode));
    })
    .catch((err) => {
        res.status(500).json(error("Something went wrong", res.statusCode));
      });
 }

 /*
 exports.users_updates_user = (req, res, next)=>{
    const id = req.params.userId;
    const updateOps = {};
    for(const ops of req.body){
        updateOps[ops.propName]=ops.value;

    }
    User.update({_id: id},{$set: updateOps})
    .exec()
    .then(result => {
      
        const response ={
            message:'User updated',
            request: {
                type: 'GET',
                url: 'http://localhost:3000/user/'+ id
            }
        }
       
        res.status(200).json(success("OK",response,res.statusCode));

    })
    .catch((error) => {
        res.status(500).json(error("Something went wrong", res.statusCode));
      });


}
exports.forgot_password = function(req, res) {
    async.waterfall([
      function(done) {
        User.findOne({
          email: req.body.email
        }).exec(function(err, user) {
          if (user) {
            done(err, user);
          } else {
            done('User not found.');
          }
        });
      },
      function(user, done) {
        // create the random token
        crypto.randomBytes(20, function(err, buffer) {
          var token = buffer.toString('hex');
          done(err, user, token);
        });
      },
      function(user, token, done) {
        User.findByIdAndUpdate({ _id: user._id }, { reset_password_token: token, reset_password_expires: Date.now() + 86400000 }, { upsert: true, new: true }).exec(function(err, new_user) {
          done(err, token, new_user);
        });
      },
      function(token, user, done) {
        var data = {
          to: user.email,
          from: email,
          template: 'forgot-password-email',
          subject: 'Password help has arrived!',
          context: {
            url: 'http://localhost:3000/auth/reset_password?token=' + token,
            name: user.fullName.split(' ')[0]
          }
        };
  
        smtpTransport.sendMail(data, function(err) {
          if (!err) {
            return res.json({ message: 'Kindly check your email for further instructions' });
          } else {
            return done(err);
          }
        });
      }
    ], function(err) {
      return res.status(422).json({ message: err });
    });
  };
  */
  exports.user_delete = (req, res, next)=>{
    User.remove({_id:req.params.userId})
    .exec()
    .then((doc) => {
        if (doc.deletedCount > 0) {
          res.status(200).json(success("User Deleted",doc,res.statusCode));
        } else {
          res.status(404).json(error("Not found", res.statusCode));
        }
      })
    .catch(err => {
        res.status(500).json(error("Something went wrong", res.statusCode));
    });

  };