import React, { useContext, useState } from 'react'
import noteContext from '../context/notes/noteContext'

function AddNote() {
    const {addNote} = useContext(noteContext);

    const [note,setNote] = useState({title:"",description:"",tag:""});

    const handleAddNote = (e)=>{
        e.preventDefault();
        addNote(note.title,note.description,note.tag);
        setNote({title:"",description:"",tag:""});
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
          <input type="text" className="form-control" id="title" value={note.title} name="title" onChange={onChange} aria-describedby="emailHelp"/>
        </div>
        <div className="mb-3">
          <label htmlFor="description" className="form-label">Description</label>
          <input type="text" className="form-control" value={note.description} id="description"onChange={onChange}  name="description"/>
        </div>
        <div className="mb-3">
          <label htmlFor="tag" className="form-label">tag</label>
          <input type="text" className="form-control" value={note.tag} id="tag"onChange={onChange}  name="tag"/>
        </div>
        <button disabled={note.title.length < 4|| note.description.length < 4 } type="submit" className="btn btn-primary" onClick={handleAddNote}>Add Note</button>
      </form>
    </div>
  )
}

export default AddNote
