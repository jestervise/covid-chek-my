import express from 'express';
require('dotenv').config();
var config = require('./config');
const app = express();

app.get('/', (req,res)=>{
    res.send("Home page");
})

app.listen(config.port,()=> {
    console.log(`The server has started running, it is listening to port ${config.port}`);
})