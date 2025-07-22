const mongoose = require('mongoose');

const User = mongoose.model('user',
    {
        name: String,
        email: String,
        password: String,
        // photo: {
        //     type: String,
        //     default: 'uploads/images/default.png'
        // }
    }
);

module.exports = User;