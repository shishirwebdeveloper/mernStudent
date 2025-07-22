const express = require('express');
const bodyParser = require('body-parser');
const connectDB = require('./config/db');
const userRoutes = require('./routes/userRoutes');
const adRoutes = require('./routes/adRoutes');
const dotenv = require('dotenv');
const app = express();

app.use(express.static('uploads'));

dotenv.config();

app.use(bodyParser.json());

connectDB();

app.use('/api/users', userRoutes);
app.use('/api/ads', adRoutes);


app.listen(process.env.PORT, () => {
    console.log('server running 8000');
})