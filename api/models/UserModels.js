const mongoose = require('../../config/db');
const validator = require('validator')

const Schema = mongoose.Schema

const UserSchema = new Schema({

    name: {
        type: String,
        required: true,
        trim: true,
        minlength: 2,
        maxlength: 20
    },

    email: {
        type: String,
        required: true,
        trim: true,
        unique: true,
        validate: {
            validator: (v) => {
                return validator.isEmail(v)
            },
            message: '{VALUE} is not a valid Email!'
        }
    },

    username: {
        type: String,
        required: true,
        unique: true,
    },

    password: {
        type: String,
        required: true,
    }
})

const User = mongoose.model('User', UserSchema);
module.exports = User