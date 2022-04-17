const mongoose = require('mongoose');
//Creating model for users using mongoose 
const {Schema} = mongoose;
//Creating user schama for the authentication
const UserSchema = new Schema({
    name:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true,
        unique: true
    },
    password:{
        type: String,
        required: true
    },
    date:{
        type:Date,
        default: Date.now
    }
  });

  const Users = mongoose.model('user', UserSchema);
  module.exports = Users;