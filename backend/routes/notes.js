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
    body('description','Enter atleast 4 letters').isLength({min:4}),
],async (req,res)=>{
    try {
        const {title,description,tag} = req.body;

        // If there are errors, return Bad requests and errors 
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        };

        const notes = new Note({
            title,description,tag, user: req.user
        });

        const savedNote = await notes.save();

        res.json(savedNote);
    } catch (error) {
        console.log(error.message);
        res.status(500).send('Internal error occured');
    }

})

//ROUTE 3: PUT update a note using "/api/notes/updatenote/:id"
router.put('/updatenote/:id',fetchuser,[
    body('title','Enter atleast 4 letters').isLength({min:4}),
    body('description','Enter atleast 4 letters').isLength({min:4}),
],async (req,res)=>{
    try {
        const {title,description,tag} = req.body;

        // If there are errors, return Bad requests and errors 
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        };
        const newNote = {};
        if(title){newNote.title = title};
        if(description){newNote.description = description};
        if(tag){newNote.tag = tag};


        let note = await Note.findById(req.params.id);
        if(!note){res.status(404).send("Not found")};

        if(note.user.toString() !== req.user){
            res.status(404).send("Not allowed");
        };

        note = await Note.findByIdAndUpdate(req.params.id,{$set:newNote},{new:true});
        res.json({note});
    } catch (error) {
        console.log(error.message);
        res.status(500).send('Internal error occured');
    }

});

    //ROUTE 4: DELETE delete a note using "/api/notes/deletenote/:id"
    router.delete('/deletenote/:id',fetchuser,async (req,res)=>{
        try {

            let note = await Note.findById(req.params.id);
            if(!note){res.status(404).send("Not found")};

            if(note.user.toString() !== req.user){
                res.status(404).send("Not allowed");
            };

            note = await Note.findByIdAndDelete(req.params.id);
            res.json({"seccess":"note has been deleted",note:note});
        } catch (error) {
            console.log(error.message);
            res.status(500).send('Internal error occured');
        }

    });

module.exports = router