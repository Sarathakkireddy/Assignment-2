const app = require('./app');
const dotenv = require("dotenv").config();
const mongoose = require('mongoose');
const port = process.env.port;
mongoose.connect(process.env.dburl).then(()=>{
     console.log('connected to DB');
    }).then(()=>{
        app.listen(port, () => console.log(`Server running on port ${port}...`));
    })