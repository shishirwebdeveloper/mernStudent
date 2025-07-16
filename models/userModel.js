const mongoose = require('mongoose');

const User = mongoose.model('user',
    {
        name: String,
        email: String,
        address: String,
        photo: {
            type: String,
            default: 'uploads/images/default.png'
        }
    }
);

module.exports = User;