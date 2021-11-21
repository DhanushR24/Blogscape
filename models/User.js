const mongoose = require('mongoose');
const schema = mongoose.Schema;
const { isEmail } = require('validator');

const userSchema = new schema({
    userName: {
        type: String,
        required: [true, 'User name is required']
    },
    password: {
        type: String,
        required: [true, 'Password is required']
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true,
        validate: [isEmail, 'Please enter a valid email']
    },
    Bdate: {
        type: Date,
        required: [true, 'Birth date is required'],
        max: [new Date(2006, 1, 1), 'Birth date is invalid']
    },
    role: {
        type: String,
        default: 'user'
    }
});

const User = mongoose.model('User', userSchema);

module.exports = User;