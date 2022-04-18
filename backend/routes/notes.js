const express = require('express');
const router = express.Router();
const Note = require('../models/Note');
const fetchuser = require('../middleware/fetchuser');
const { body, validationResult } = require('express-validator');


//ROUTE 1: GET all the notes of a user if the token matches "/api/notes/getnotes". Login required
router.get('/getnotes',fetchuser, async (req,res)=>{
    const notes = await Note.find({user:req.user});
    res.json(notes);
})

//ROUTE 2: POST add a note using "/api/notes/addnote"
router.post('/addnote',fetchuser,[
    body('title','Enter atleast 4 letters').isLength({min:4}),
    body('description','Enter atleast 4 letters').isLength({min:4})
],async (req,res)=>{
    try {
        const {title,description,tag} = req.body;

        // If there are errors, return Bad requests and errors 
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        };

        const notes = new Note({
            title,description,tag,user:req.user
        });

        const savedNote = await notes.save();
        res.json(savedNote);
    } catch (error) {
        console.log(error.message);
        res.status(500).send('Internal error occured');
    }
})


module.exports = router