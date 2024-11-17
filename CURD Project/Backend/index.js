const express = require('express')
const mongoose = require('mongoose')
require('dotenv').config();

const userRoute = require('./Route/UserRoute')

const app = express();

app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use('/auth',userRoute)

const port = process.env.PORT || 8080;
const MONGOURL = process.env.MONGOURL

mongoose.connect(MONGOURL)
.then(()=>{
    console.log("connected to mongo",MONGOURL);
})
.catch(()=>{
    console.log("errro when connecting to mongo")
})

app.listen(port,()=>{
    console.log(`Server is running on port ${port}`);
    
})