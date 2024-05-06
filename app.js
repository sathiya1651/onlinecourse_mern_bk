const express = require('express')
const mongoose=require('mongoose')
const dotenv = require('dotenv')
const bodyParser = require('body-parser')
const routes = require('./Routes/userroutes')
const courseroutes = require('./Routes/courseroutes')
const cors = require('cors');

dotenv.config()
const app = express()


const port=process.env.PORT || 8000;
const MONGOURL = process.env.MONGO_URL;

app.use(cors())


app.use(bodyParser.json())


app.use('/api',routes);
app.use('/api',courseroutes);




mongoose.connect(MONGOURL).then(()=>{    
    console.log("Mongo DB connected");
})
.catch((err)=>{
    console.error("err",err)
})

app.listen(port,(err)=>{
    if(!err){
        console.log(`server port ${port}`)
    }else{
        console.error("server disconnected")
    }

})