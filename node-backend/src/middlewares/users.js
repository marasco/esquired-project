const userModel = require('../models/users');
const jwt = require('jsonwebtoken');

module.exports = {
 
 exists: function(req, res, next) {
   userModel.findOne({email:req.body.email}, function(err, user){
    if (err) {
      return res.json({state:"Error", message: err.message, data:null});
    }
    if(user){
    	  let err = new Error("User already exists"+ user);
    	  err.state = 409;
      return res.json({state: err.state, message: "Email in use"})
    } else{
        next();
    }
 });
 },
 isValid: function(req, res, next) {
  jwt.verify(req.headers['x-access-token'], process.env.TOKEN_KEY, function(err, decoded) {
    if (err) {
      return res.json({state:"Error", message: err.message, data:null});
    }else{
      req.body.userId = decoded._id;
      next();
    }
  });
}

}