const userModel = require('../models/users');
const adminModel = require('../models/admins');
const appModel = require('../models/appearances');
const bcrypt = require('bcrypt'); 
const jwt = require('jsonwebtoken');

module.exports = {

make: function(req, res, next){
    adminModel.findById(req.body.id, function(err, user) {
    if (!user) return res.status(404).send({message: "No user found", user: user});
    if (user.isAdmin) return res.status(200).send({message:"This user is already admin", data: user})
    else {
      user.isAdmin = true;
      user.save().then(user => {
        return res.status(200).send({message: "User updated", data: user});
      })
      .catch(err => {
            res.status(400).send("Unable to update");
      });
    }
  });
},

 register: function(req, res, next){
   adminModel.findOne({ email: req.body.email }, function (err, user) {

    if (user) return res.status(400).send({ message: 'The email address you have entered is already associated with another account.' });

    admin = new adminModel({
      email: req.body.email,
      password: req.body.password
    });

    admin.save(function (err) {
      if (err) { return res.status(500).send({ message: err.message }); 
    } else { return res.status(200).send({ message: 'User added successfully' }) }

    });

  });
 },
 authenticate: function(req, res, next){
   adminModel.findOne({email:req.body.email}, function(err, admin){
    if (err) { return res.status(500).send({ message: err.message   }); }
    if (!admin) { return res.status(401).send({ message: "User not found"}); }

    if(bcrypt.compareSync(req.body.password, admin.password)) {
        const token = jwt.sign({ _id:admin._id }, process.env.TOKEN_KEY_ADMIN, { expiresIn: process.env.TOKEN_LIFE_ADMIN})
        return res.status(200).send({ token: token, result: admin });
    } else {
        return res.status(409).send({ message: "Incorrect user/password", result: admin });
    }
  });
 },

 disableUser: function(req, res, next){
   userModel.findById(req.body.id, function(err, user) {
     if(user.isDisabled){return res.status(200).send({message: "User is already disabled"})}
      userModel.updateOne({isDisabled: true},function (err) {
          if (err) { return res.status(500).send({ msg: err.message }); }
        res.status(200).send({message:"User disabled"});
      });
   })
 },


deleteUser: function(req, res, next){
  userModel.findByIdAndRemove(req.body.id, function(err, user){
    if(err){ return res.status(500).send({ message: err.message }) }
      return res.status(200).send({ message: "User deleted" })
  });
},

getUsers: function(req, res, next){
  userModel.find({},function(err, users){
    if(err){ res.status(500).send({ message: err.message }) }
      return res.status(200).send({ data: users })
  });
},

getAttorneys: function(req, res, next){
  userModel.find({isAttorney: {$eq: true}}, function(err, result) {
    if (err){ return res.json({status: "Error", message: err}); } 
     else { return res.status(200).send({data: result}); }
  })   
},
getSeekers: function(req, res, next){

  userModel.find({isSeeker: {$eq: true}}, function(err, result) {
      if (err){
        return res.json({status: "Error", message: err});
      } else {
        return res.status(200).send({data: result});
      }
  })   

},
getAppearances: function(req, res, next){ // Agregar en el modelo
  appModel.find(function(err, result) {
      if (err){
        return res.json({status: "Error", message: err});
      } else {
        return res.status(200).send({data: result});
      }
  })   

},

}