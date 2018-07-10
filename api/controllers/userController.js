const User = require('../models/UserModels')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

// @Route (POST) /api/users/singup
// @Desc        User Can SingUp From Here...
// @Access       Public
const userSingUpController = (req, res, next) => {

    // Email Checking System
    User.find({
            email: req.body.email
        })
        .then(result => {
            if (result.length > 0) {
                res.json({
                    message: "SingUp Failed 😯 Email Already Exist 😐 😑"
                })
            }
        })

    //Username Checking System
    User.find({
            username: req.body.username
        })
        .then(result => {
            if (result.length > 0) {
                res.json({
                    message: "SingUp Failed 😯 Username Already Exist 😐 😑"
                })
            }
        })


    bcrypt.hash(req.body.password, 10, (err, hash) => {
        if (err) {
            console.log(err)
            res.json({
                message: "Password Hashing Failed 😔 😫"
            })
        } else {
            const user = new User({
                name: req.body.name,
                username: req.body.username,
                email: req.body.email,
                password: hash
            })

            user.save()
                .then(result => {
                    console.log(result);
                    res.status(201).send({
                        message: "User Created Successfully 😯 😊  Now You Can Login... 😏 😊",
                        user: result
                    })
                })
                .catch(err => {
                    console.log(err);
                    res.status(500).send({
                        message: "User Not Created 😣 😶"
                    })
                })

        }
    });

}

// ------------------------------


// @Route (POST) /api/users/login
// @Desc        User Can Login From Here...
// @Access       Public
const userSingInController = (req, res, next) => {
    const email = req.body.email
    const password = req.body.password

    User.findOne({
            email
        })
        .then(user => {
            bcrypt.compare(password, user.password, (err, result) => {
                if (err) {
                    console.log(err)
                    res.status(203).send({
                        err
                    })
                } else {
                    if (result) {
                        const token = jwt.sign({
                            email: user.email,
                            username: user.username,
                            _id: user.id
                        }, 'SECRET-KEY', {
                            expiresIn: '10h'
                        })
                        res.status(200).send({
                            message: "Login Successfully!  😊 🤠",
                            token
                        })
                    } else {
                        res.status(406).send({
                            message: "Login Failed! Invalid Email or Password 😶 😇 😶"
                        })

                    }

                }
            })
        })
        .catch(err => {
            console.log(err);
            res.status(203).json({
                message: "Login Failed! Invalid Email or Password 😶 😇 😶"
            })
        })


}

// ------------------------------

// @Route (GET) /api/users/
// @Desc         Get All Users
// @Access       Private
const getAllUserController = async (req, res, next) => {

    try {
        const allUsers = await User.find()
        res.status(200).send({
            "message": "Get All Users 😊 😍",
            allUsers
        })
    } catch (error) {
        console.log(error)
        res.status(500).send(error)
    }


}

module.exports = {
    userSingUpController,
    userSingInController,
    getAllUserController
}