import noteContext from "./noteContext";
import { useState } from "react";

const NoteState = (props)=>{
    const notes = 
    [
        {
          "_id": "625ea22384544f624772da942",
          "user": "625dd26af502c165ec6d672d",
          "title": "hie i am 3 title",
          "description": "hie i  3 am description",
          "tag": "personal",
          "date": "2022-04-19T11:50:59.052Z",
          "__v": 0
        },
        {
          "_id": "625ea27a83454f624772da946",
          "user": "625dd26af502c165ec6d672d",
          "title": "hie i am 4 title",
          "description": "hie i  4 am description",
          "tag": "personal",
          "date": "2022-04-19T11:52:26.532Z",
          "__v": 0
        },
        {
          "_id": "625ea2828454f5624772da948",
          "user": "625dd26af502c165ec6d672d",
          "title": "hie i am 5 title",
          "description": "hie i  5 am description",
          "tag": "personal",
          "date": "2022-04-19T11:52:34.169Z",
          "__v": 0
        },
        {
          "_id": "625ea27a845454f624772da946",
          "user": "625dd26af502c165ec6d672d",
          "title": "hie i am 4 title",
          "description": "hie i  4 am description",
          "tag": "personal",
          "date": "2022-04-19T11:52:26.532Z",
          "__v": 0
        },
        {
          "_id": "625ea28282454f624772da948",
          "user": "625dd26af502c165ec6d672d",
          "title": "hie i am 5 title",
          "description": "hie i  5 am description",
          "tag": "personal",
          "date": "2022-04-19T11:52:34.169Z",
          "__v": 0
        },
        {
          "_id": "625ea27a84542f624772da946",
          "user": "625dd26af502c165ec6d672d",
          "title": "hie i am 4 title",
          "description": "hie i  4 am description",
          "tag": "personal",
          "date": "2022-04-19T11:52:26.532Z",
          "__v": 0
        },
        {
          "_id": "625ea28284543f624772da948",
          "user": "625dd26af502c165ec6d672d",
          "title": "hie i am 5 title",
          "description": "hie i  5 am description",
          "tag": "personal",
          "date": "2022-04-19T11:52:34.169Z",
          "__v": 0
        }
      ];

      const [note,setNote] = useState(notes);


      //Add note
      const addNote = (noteData)=>{
        const noteAdd = {
          "_id": `625ea28284543f624772da948`,
          "user": "625dd26af502c165ec6d672d",
          "title": noteData.title,
          "description": noteData.description,
          "tag": noteData.tag,
          "date": "2022-04-19T11:52:34.169Z",
          "__v": 0
        };
        setNote(note.concat(noteAdd));
      }

      //Delete a node
      const deleteNode = (id)=>{
        const newNotes = note.filter((notes)=>{return notes._id!==id});
        setNote(newNotes);
      }
    return (
        <noteContext.Provider value={{note,addNote,deleteNode}}>
            {props.children}
        </noteContext.Provider>
    )
};

export default NoteState;