const mongoose = require('mongoose');
const express = require('express');
const cors = require('cors');
require('dotenv').config();
 
const app = express();
app.use(cors());
//middle
app.use(express.json());

 // routes
 app.use('/api/user', require('./routes/userRoutes'));

 // mondodb connection
 mongoose.connect(process.env.MONGO_URI)
 .then(() => {
    console.log('connected to mongodb');
 })
 .catch(err =>  { 
  console.log(err);
 });

 // port connection
 const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => {    
    console.log(`server is running on port ${PORT}`);
  });
