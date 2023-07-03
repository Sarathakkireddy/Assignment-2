const mongooose = require('mongoose');

const userSchema = new mongooose.Schema({
    name:{type: String,required:true},
    email: {type: String,unique:true,required:true},
    password: {type: String,required:true}
})

const Users = mongooose.model('users', userSchema);

module.exports = Users;