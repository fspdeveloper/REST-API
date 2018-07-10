// Database options
const mongoose = require('mongoose');
mongoose.connect('mongodb://itsujon:it1357@ds129541.mlab.com:29541/db_contacts', {
        useNewUrlParser: true
    })
    .then(() => {
        console.log('Database Connected 😎 😎 😎')
    })
    .catch(() => {
        console.log('Database Not Connected 😒 😢  Something Wrong 🤔')
    })

module.exports = mongoose