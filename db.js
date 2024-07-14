const mongoose = require('mongoose');
require('dotenv').config();

//define mongodb connection URL in computer
// const mongoURL =process.env.MONGODB_URL_LOCAL

//define mongodb connection URL in altas Online
const mongoURL=process.env.DB_URL;

//set up mongoDb connection
mongoose.connect(mongoURL,{
    useNewUrlParser:true,
    useUnifiedTopology:true
})

//Get the default connection
//Mongoes maintains a default connection object representing the mongoDb connection
const db = mongoose.connection;

//define eventListener for database connection
db.on('connected',()=>{
    console.log('connected to MongoDb sever');
});
db.on('error',(err)=>{
    console.log('mongoDb connection error:',err);
});
db.on('disconnected',()=>{
    console.log('Disconnected to MongoDb sever');
});

//export database connection
module.exports = db;