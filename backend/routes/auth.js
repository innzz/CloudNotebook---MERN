const express = require('express');
const User = require('../models/User');
const { body, validationResult } = require('express-validator');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const JWT_SIGN = "inzamamisahandsomeguy";
const fetchuser = require('../middleware/fetchuser');

//Create a user using: POST "/api/auth/createUser". 
router.post('/createUser',[
    body('name', 'Enter min 7 letters').isLength({ min:4}),
    body('email','Enter a valid email').isEmail(),
    body('password','Password must be 4 letters').isLength({min:4})
],async (req,res)=>{
    // If there are errors, return Bad requests and errors 
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    
    try {
    //Checking the user emails with the current user email 
    let user = await User.findOne({email:req.body.email});

    //if current user email exists already then it will give error
    if(user){
        return res.status(400).json({error:"Sorry the user with same email already exists"});
    }

    const salt = await  bcrypt.genSalt(10);
    const secPass = await bcrypt.hash(req.body.password,salt);

    //Creating user from User Module
        user = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: secPass,
      })
      const data = {
          user: user.id
      }
      const authToken = jwt.sign(data, JWT_SIGN);
    //   res.json(user);
        res.json({authToken});
      //If there will be any error in syntax it will cath it and show it on console
    } catch (error) {
        console.log(error.message);
        res.status(500).send('Some error occured');
    }
      
    })
    
    
    //Creating user login end point:  POST "/api/auth/login".
    router.post('/login',[
        body('email','Enter a valid email').isEmail(),
        body('password','Please write the correct password').exists()
    ],async (req,res)=>{
        const errors = validationResult(req);
        let success = false
        
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        
        try {
            //Destructuring email and password from req.body 
            const {email,password} = req.body;

            //Searching user from email if it exists in the database 
            let user = await User.findOne({email});

            // console.log(user);

            //If user does not exists
            if(!user){
                success=false;
                res.status(400).json({success,error:"Please enter the correct credentials"});
            }

            //If user exists then checking its password with hashed password
            let comparePass = await bcrypt.compare(password,user.password);

            //If password does not match
            if(!comparePass){
                success=false;
                res.status(400).json({success,error:"Please enter the correct credentials"});
            }
            
            //Creating auth token of user
            const data = {
                user: user.id
            }
            //Giving sign to the authtoken
            const authToken = jwt.sign(data, JWT_SIGN);
            success=true;
            //Sending user's authtoken
            res.json({success,authToken});
            
        } catch (error) {
            console.log(error.message);
            res.status(500).send('Internal error occured');
        }

    })

    
    //Creating end point to get users:  POST "/api/auth/getuser".
    //Using middle ware as fetchuser
    router.post('/getuser',fetchuser, async (req,res)=>{
        try {
            //Grabbing user's id from the req header
            const userId = req.user;

            //Searching for the user by the given id if its exists in the database and removing password
            const user = await User.findById(userId).select('-password');

            //Showing data of the user
            res.send(user);
        } catch (error) {
            res.status(500).send('Internal error occured');
        }

    });
    
    module.exports = router