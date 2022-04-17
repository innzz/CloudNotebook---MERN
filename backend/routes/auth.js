const express = require('express');
const User = require('../models/User');
const { body, validationResult } = require('express-validator');
const router = express.Router();


//Create a user using: POST "/api/auth/createUser". 
router.post('/createUser',[
    body('name', 'Enter min 7 letters').isLength({ min:7}),
    body('email','Enter a valid email').isEmail(),
    body('password','Password must be 4 letters').isLength({min:4})
],async (req,res)=>{
    // If there are errors, return Bad requests and errors 
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    
    try {
    //Checking the users emails with the current user email 
    let users = await User.findOne({email:req.body.email});

    //if current user email exists already then it will give error
    if(users){
        return res.status(400).json({error:"Sorry the user with same email already exists"});
    }

    //Creating users from Users Module
        users = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
      })
      res.json(users);
      //If there will be any error in syntax it will cath it and show it on console
    } catch (error) {
        console.log(error.message);
        res.status(500).send('Some error occured');
    }
      
    })
    
    module.exports = router