const express = require('express');
const app = express();
const db = require('./db');
require('dotenv').config();
const passport = require('./auth');
const PORT = process.env.PORT || 3000;

const bodyParser = require('body-parser');
app.use(bodyParser.json());//req.body


// const Person = require('./models/person');
// const Menuitem = require('./models/Menuitem');


// Middleware Function
const logRequest = (req, res, next) => {
    console.log(`[${new Date().toLocaleString()}] Request Made to : ${req.originalUrl}`);
    next(); // Move on to the next phase
}
app.use(logRequest);

app.use(passport.initialize());
const localAuthMiddleware = passport.authenticate('local', {session: false});


app.get('/',function(req,res){
    res.send("welcome to our hotel!");
})

app.get('/mkm',function(req,res){
    res.send("welcome mkm")
})

app.get('/idli',(req,res) =>{
    var customized_idli={
        name:'rava idli',
        size:'10 cm diameter',
        is_samber:true
    }
    res.send(customized_idli);
})

app.post('/item',(req,res)=>{
    res.send("data is save");
})

//post route to add a person
// app.post('/person',async(req,res) => {

    //this give error because of callback fn. so, we can use async and await method to resolve this prblm
    // const data =req.body  //assuming the request body contains the person data

    // //create a new person doc using the mongoose model
    // const newPerson = new Person(data);
    // // newPerson.name =data.name;
    // // newPerson.age=data.age;
    // // newPerson.moblie=data.moblie;
    // // newPerson.email=data.email;
    // // newPerson.address=data.address;

    // //save the new person to the database
    // newPerson.save((error,savedPerson) => {
    //     if(error){
    //         console.log('Error saving person:',error);
    //         res.status(500).json({error:'Internal server error'})
    //     }
    //     else{
    //         console.log('data saved successfully');
    //         res.status(200).json(savedPerson);
    //     }
    // })
   

    //here we use asyn await methode
//     try{
//         const data = req.body;
//         const newPerson = new Person(data);
//         const response = await newPerson.save();
//         console.log("data saved");
//         res.status(200).json(response);
//     }catch(err){
//         console.log(err);
//         res.status(500).json({error:'Internal server error'});
//     }

// });


//Import the router files
const PersonRoutes = require('./routes/PersonRoutes');
const MenuRoutes = require('./routes/menuRoutes');

//use the router
app.use('/person',PersonRoutes);
// for Authentication middleware
// app.use('/person',localAuthMiddleware,PersonRoutes);

app.use('/menu',MenuRoutes);

app.listen(PORT ,() =>{
    console.log('listening on port 3000')
});