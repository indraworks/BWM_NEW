const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: {
    type: String,
    minlength: [4, 'invalid length!minimum char should be 4 chars'],
    maxlength: [32, 'invalid length!maximum char should be 32 chars'],
    required: 'email is required',
  },
  email: {
    type: String,
    minlength: [4, 'invalid length!minimum char should be 4 chars'],
    maxlength: [32, 'invalid length!maximum char should be 32 chars'],
    unique: true, //jgn lupa unique harus true gak boleh ada email yg sa,a
    lowercase: true,
    required: 'email is required',
    match:[/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/]
  },
  password: {
    type: String,
    minlength: [4, 'invalid length!minimum char should be 4 chars'],
    maxlength: [32,'invalied maximum length char should be 32 chars'],
    required: 'password is required',
  },
});
module.exports = mongoose.model('users',userSchema);
