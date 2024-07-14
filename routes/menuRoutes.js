const express = require('express');
const router = express.Router();

const Menuitem = require('../models/Menuitem');

//post route to add the Menuitem
router.post('/',async(req,res)=>{
    try{
        const data = req.body;
        const newMenu = new Menuitem(data);
        const response = await newMenu.save();
        console.log("data saved");
        res.status(200).json(response);
    }catch(err){
        console.log(err);
        res.status(500).json({error:'Internal server error'});
    }
});

//GET to get the menu
router.get('/',async(req,res)=>{
    try{
        const data = await Menuitem.find();
        console.log('data fetched');
        res.status(200).json(data);
    }catch(err){
        console.log(err);
        res.status(500).json({error:'Internal server error'});
    }
});
router.get('/:taste',async(req,res) => {
    try{
        const taste = req.params.taste; //extract the tatse from the URL parameter
        if(taste == 'spicy' || taste =='sour' || taste == 'sweet'){
            const response = await Menuitem.find({taste:taste});
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
        const menuId = req.params.id; //extract the id from the URL parameter
        const updateMenuData = req.body;  //updated data for the person

        const respone = await Menuitem.findByIdAndUpdate(menuId,updateMenuData,{
            new:true,  //return the updated doc
            runValidators:true, //run mongooes validation
        })
        if(!respone){
            return res.status(404).json({error:'menu not found'})
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
        const menuId = req.params.id;
        //assuming you have a menu model
        const response = await Menuitem.findByIdAndDelete(menuId);
        if(!response){
            return res.status(404).json({error:'menu not found'});
        }
        console.log("data delete");
        res.status(200).json({message:'menu deleted successfully'});
    }catch(err){
        console.log(err);
        res.status(500).json({err:'Internal server error'});
    }

});

module.exports = router;