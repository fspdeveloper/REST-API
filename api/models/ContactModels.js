const mongoose = require('../../config/db');
const validator = require('validator')

const Schema = mongoose.Schema

const ContactSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },

    phoneNumber: {
        type: String,
        required: true,
        trim: true,
        unique: true,
        validate: {
            validator: (v) => {
                return /^(?:\+88|01)?(?:\d{11}|\d{13})$/.test(v)
            },
            message: '{VALUE} is not a valid phone number!'
        }
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

    facebookID: {
        type: String,
        required: true
    },
    address: {
        street: String,
        state: String,
        city: String,
        country: String
    }
});


const Contact = mongoose.model('Contact', ContactSchema);
module.exports = Contact