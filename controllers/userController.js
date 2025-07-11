const User = require('../models/userModel');

const createUser = async (req, res) => {
  
    try {
        
        const { name, email, address } = req.body;
        const user = new User({
            name: name,
            email: email,
            address: address
        });
        user.save();
        res.status(200).json({ status: 200, message: 'Record inserted' });
    } catch (error) {
        console
        res.status(400).json({ status: 400, message: 'Record not inserted' });
    }

}

const viewUser = async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json({ status: 200, message: 'Record list','Users':users});
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

const viewUserById = async (req, res) => {
    try {
        const user =
            await User.findById(req.params.id);
        if (!user) {    
            return res.status(404).json({ status: 404, message: 'User not found' });
        }           
        res.status(200).json({ status: 200, message: 'User found', user: user });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

const updateUser = async (req, res) => {
    try {
        const { name, email, address } = req.body;
        const user = {
            name: name,
            email: email,
            address: address
        };
        await User.findByIdAndUpdate(req.params.id, user);
        res.status(200).json({ status: 200, message: 'Record updated' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

const deleteUser = async (req, res) => {
    try {
        await User.findByIdAndDelete(req.params.id);
        res.status(200).json({ status: 200, message: 'Record deleted' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

module.exports = {createUser,viewUser, viewUserById, updateUser, deleteUser};