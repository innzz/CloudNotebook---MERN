import noteContext from "./noteContext";
import { useState } from "react";

const NoteState = (props)=>{
  const host = "http://localhost:5000";
    const notes = [];

      const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoiNjI2MDNhYjUyYTFiNWE4MTE1OGU4MDg5IiwiaWF0IjoxNjUwNDczNjg3fQ.NGLN0DNJMjJIMrkO3mvma4SnffSpXckYUdMCHjXU_48";


      const [note,setNote] = useState(notes);

      const getNotes = async ()=>{
        const response = await fetch(`${host}/api/notes/getnotes`,{
          method: "GET",
          headers:{
            "Accept": "application/json",
            'Authorization': token,
            "Content-Type": "application/json"
          }
        });
        const json = await response.json();
        setNote(json);

      }

      //Add note
      const addNote = async (title,description,tag)=>{
        const response = await fetch(`${host}/api/notes/addnote`,{
          method: "POST",
          headers:{
            'Accept':'application/json',
            'Content-Type':'application/json',
            'Authorization':token
          },
          body: JSON.stringify({title,description,tag})
        });
        const noteAdd = {
          "_id":"kukebfkebfkheygifgef",
          "title": title,
          "description": description,
          "tag": tag,
        };
        setNote(note.concat(noteAdd));
      }

      //Delete a node
      const deleteNode = async (id)=>{
        const response = await fetch(`${host}/api/notes/deletenote/${id}`,{
          method: "DELETE",
          headers:{
            'Content-Type':'application/json',
            'Authorization':token
          },
        });
        const newNotes = note.filter((notes)=>{return notes._id!==id});
        setNote(newNotes);
      };

      //Edit Note
      const editNote = async (id,title,description,tag)=>{
        const response = await fetch(`${host}/api/notes/updatenote/${id}`,{
          method: "PUT",
          headers:{
            'Content-Type':'application/json',
            'Authorization':token
          },
          body: JSON.stringify({title,description,tag})
        });
        const json = response.json();
        for (let index = 0; index < note.length; index++) {
          const element = note[index];
          if (element._id === id) {
            element.title = title;
            element.description = description;
            element.tag = tag;
          }
        }
      }
    return (
        <noteContext.Provider value={{note,addNote,deleteNode,getNotes}}>
            {props.children}
        </noteContext.Provider>
    )
};

export default NoteState;