const express = require('express');
const bodyParser = require('body-parser');
const {createUser,viewUser, viewUserById, updateUser, deleteUser} = require('./controllers/userController');
const connectDB = require('./config/db');
const dotenv = require('dotenv');
const app = express();

dotenv.config();

app.use(bodyParser.json());

connectDB();

app.post('/createuser', createUser);
app.get('/viewuser', viewUser);
app.get('/viewuser/:id', viewUserById); 
app.put('/updateuser/:id',  updateUser);
app.delete('/deleteuser/:id', deleteUser);

app.listen(process.env.PORT, () => {
    console.log('server running 8000');
})