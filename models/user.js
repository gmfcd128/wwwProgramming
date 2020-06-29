var mongoose = require('mongoose');
const bcrypt = require('bcrypt-nodejs');
var Schema = mongoose.Schema;

var User = new Schema({
    username: {
        type: String,
        unique: true,
        default: ''
    },
    password: {
        type: String,
        default: ''
    },
    email: {
        type: String,
        unique: true,
        default: ''
    },
    fullname: {
        type: String,
        unique: true,
        default: ''
    },
    userImage: {
        type: String,
        default: 'default.png'
    },
    facebook: { type: String, default: '' },
    fbTokens: Array,
    google: { type: String, default: '' },
    googleTokens: Array
});

User.methods.encryptPassword = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(10), null);
};

User.methods.validUserPassword = function(password) {
    return bcrypt.compareSync(password, this.password);
};

module.exports = mongoose.model('User', User);