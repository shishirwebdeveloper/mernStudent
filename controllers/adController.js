const User = require('../models/userModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();


const createAd = async (req, res) => {
  
    try {
        
       const userId = req.user.id;
        res.status(200).json({ status: 200, message: 'Ad created',user:req.user });
    } catch (error) {
        console
        res.status(400).json({ status: 400, message: 'Ad not inserted' });
    }

}

const listAd = async (req, res) => {

  
    try {
         const userId = req.user.id;
        // await Ads.findById(userId);
        //     if (!user) {    
        //         return res.status(404).json({ status: 404, message: 'User not found' });
        //     }           
           
        res.status(200).json({ status: 200, message: 'Ad created',user:req.user });
    } catch (error) {
        console
        res.status(400).json({ status: 400, message: 'Ad not inserted' });
    }

}


module.exports = {createAd,listAd};