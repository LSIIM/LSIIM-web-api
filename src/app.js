const express = require('express');
const authRoutes = require('./routes/authRoutes');
const loginRoutes = require('./routes/loginRoutes');
const recordingRoutes = require('./routes/recordingRoutes');

const app = express();


app.use(express.json());

app.use('/auth', authRoutes); 
app.use('/login', loginRoutes);  
app.use('/recording', recordingRoutes);


module.exports = app;
