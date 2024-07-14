const express = require('express');
const router = express.Router();

const Person = require('../models/person');


//post route to add a person
router.post('/',async(req,res) => {
    try{
        const data = req.body;
        const newPerson = new Person(data);
        const response = await newPerson.save();
        console.log("data saved");
        res.status(200).json(response);
    }catch(err){
        console.log(err);
        res.status(500).json({error:'Internal server error'});
    }

});

//GET method to get the person
router.get('/',async(req,res)=>{
    try{
        const data = await Person.find();
        console.log('data fetched');
        res.status(200).json(data);
    }catch(err){
        console.log(err);
        res.status(500).json({error:'Internal server error'});
    }
});

router.get('/:workType',async(req,res)=>{
    try{
        const workType = req.params.workType; //extract the work type from the URL parameter
        if(workType == 'chef' || workType =='owner' || workType == 'waiter'){
            const response = await Person.find({work:workType});
            console.log('respone fetch');
            res.status(200).json(response);
        }else{
            res.status(404).json({error:"Invalid work type"});
        }
    }catch(err){
        console.log(err);
        res.status(500).json({err:'Internal server error'});
    }
});

router.put('/:id',async(req,res) => {
    try{
        const personId = req.params.id; //extract the id from the URL parameter
        const updatePersonData = req.body;  //updated data for the person

        const respone = await Person.findByIdAndUpdate(personId,updatePersonData,{
            new:true,  //return the updated doc
            runValidators:true, //run mongooes validation
        })
        if(!respone){
            return res.status(404).json({error:'Person not found'})
        }
        console.log('data updated');
        res.status(200).json(respone);
    }catch(err){
        console.log(err);
        res.status(500).json({err:'Internal server error'});
    }
});
router.delete('/:id',async(req,res) =>{
    try{
        const personId = req.params.id;
        //assuming you have a person model
        const response = await Person.findByIdAndDelete(personId);
        if(!response){
            return res.status(404).json({error:'person not found'});
        }
        console.log("data delete");
        res.status(200).json({message:'person deleted successfully'});
    }catch(err){
        console.log(err);
        res.status(500).json({err:'Internal server error'});
    }

});

module.exports=router;