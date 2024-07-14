const mongoose = require('mongoose');

//define mongodb connection URL
const mongoURL = 'mongodb://localhost:27017/mydatabase'

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