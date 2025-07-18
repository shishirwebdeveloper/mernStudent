const User = require('../models/userModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();


const createAd = async (req, res) => {
  
    try {
        
        const { name, email, password } = req.body;

        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        const userObj = {
            name: name,
            email: email,
            password: hashedPassword,
            //photo: req.file ? req.file.filename : 'uploads/images/default.png'
        }

        const user = new User(userObj);
        user.save();
        res.status(200).json({ status: 200, message: 'Record inserted' });
    } catch (error) {
        console
        res.status(400).json({ status: 400, message: 'Record not inserted' });
    }

}

const loginAd = async (req, res) => {
    try {                               
        const { email, password } = req.body;
        const user = await User.findOne({ email: email });

        if (!user) {
        return res.status(404).json({ status: 404, message: 'User not found' }); 
        }
        else {
            const isMatch = await bcrypt.compare(password, user.password);
        if (isMatch) {
            const payload = {email: user.email, id: user._id};
            const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });
            return res.status(200).json({ status: 200, message: 'Login successful', token:token });
        } else {    
            return res.status(200).json({ status: 404, message: 'Wrong password' }); 
        }
    }
    }catch (error) {n
        res.status(400).json({ status: 400, message: 'Login failed', error: error.message });
    } 

        
}

const viewAd = async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json({ status: 200, message: 'Record list','Users':users});
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

const viewAdById = async (req, res) => {
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

const updateAd = async (req, res) => {
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

const deleteAd = async (req, res) => {
    try {
        await User.findByIdAndDelete(req.params.id);
        res.status(200).json({ status: 200, message: 'Record deleted' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

module.exports = {viewAd,viewAdById,updateAd,deleteAd,loginAd,createAd};