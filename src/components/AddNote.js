import React, { useContext, useState } from 'react'
import noteContext from '../context/notes/noteContext'

function AddNote() {
    const {addNote} = useContext(noteContext);

    const [note,setNote] = useState({title:"",description:"",tag:""});

    const handleAddNote = (e)=>{
        e.preventDefault();
        addNote(note);
    };

    const onChange = (e)=>{
        setNote({...note,[e.target.name]:e.target.value});
    }
  return (
    <div>
            <h1>Add Note</h1>
      <form>
        <div className="mb-3">
          <label htmlFor="title" className="form-label">Title</label>
          <input type="text" className="form-control" id="title" name="title" onChange={onChange} aria-describedby="emailHelp"/>
        </div>
        <div className="mb-3">
          <label htmlFor="description" className="form-label">Description</label>
          <input type="text" className="form-control" id="description"onChange={onChange}  name="description"/>
        </div>
        <button type="submit" className="btn btn-primary" onClick={handleAddNote}>Add</button>
      </form>
    </div>
  )
}

export default AddNote
