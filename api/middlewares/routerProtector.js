const jwt = require('jsonwebtoken')

const routerProtector = (req, res, next) => {
    try {
        const token = req.header('x-auth-token');

        if (!token) {
            res.status(428).send({
                message: 'Access Denied! You must have to provide Token 😣 🤨'
            })
        }

        const decoded = jwt.verify(token, 'SECRET-KEY')
        req.user = decoded


        next()


    } catch (error) {
        res.status(203).json({
            message: "Invalid Token 😶 😇 😶"
        })
    }
}

module.exports = routerProtector