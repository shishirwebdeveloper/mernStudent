const mongoose = require('mongoose');

const User = mongoose.model('user',
    {
        name: String,
        email: String,
        address: String
    }
);

module.exports = User;