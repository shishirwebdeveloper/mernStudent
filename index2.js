const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const connectDB = require('./config/db');
const dotenv = require('dotenv');
const app = express();

dotenv.config();


app.use(bodyParser.json());

connectDB();

const User = mongoose.model('user',
    {
        name: String,
        email: String,
        address: String
    }
);

app.get('/', (req, res) => {
    console.log(process.env.PORT);
    res.send('home page');
})

app.post('/createuser', async (req, res) => {
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
        res.status(400).json({ error: error.message });
    }
})

app.get('/viewuser', async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json({ status: 200, message: 'Record list','Users':users});
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
})

app.get('/viewuser/:id', async (req, res) => {
    try {
        const users = await User.findById(req.params.id);
        res.status(200).json({ status: 200, message: 'Single Record list','Users':users});
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
})

app.put('/updateuser/:id', async (req, res) => {
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
})

app.delete('/deleteuser/:id', async (req, res) => {
    try {
        await User.findByIdAndDelete(req.params.id);
        res.status(200).json({ status: 200, message: 'Record deleted' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
})

app.listen(process.env.PORT, () => {
    console.log('server running 8000');
})