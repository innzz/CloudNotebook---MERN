import React,{useContext,useEffect,useRef,useState} from 'react';
import noteContext from '../context/notes/noteContext';
import NoteItem from "./NoteItem"

function Notes() {
    const context = useContext(noteContext);
    const {note,getNotes} = context;
    useEffect(()=>{
        getNotes();
        // eslint-disable-next-line
    },[]);

    const [updatenote,setUpdateNote] = useState({etitle:"",edescription:"",etag:""});
    
    const updateNote = (currentNote)=>{
      ref.current.click();
      setUpdateNote({etitle: currentNote.title,edescription: currentNote.description,etag: currentNote.tag});
    };

    const ref = useRef(null);



    const handleUpdateNote = (e)=>{
      console.log("Updating the note",updatenote);
        e.preventDefault();
    };

    const onChange = (e)=>{
        setUpdateNote({...updatenote,[e.target.name]:e.target.value});
    }
  return (
  <>
        <button type="button" ref={ref} className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
          Launch demo modal
        </button>
        <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">Edit Note</h5>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div className="modal-body">
              <div className="mb-3">
                  <label htmlFor="title" className="form-label">Title</label>
                  <input type="text" className="form-control" id="etitle" name="etitle" value={updatenote.etitle} onChange={onChange} aria-describedby="emailHelp"/>
                </div>
                <div className="mb-3">
                  <label htmlFor="description" className="form-label">Description</label>
                  <input type="text" className="form-control" id="edescription" value={updatenote.edescription} onChange={onChange}  name="edescription"/>
                </div>
                <div className="mb-3">
                  <label htmlFor="tag" className="form-label">tag</label>
                  <input type="text" className="form-control" id="etag" value={updatenote.etag} onChange={onChange}  name="teag"/>
                </div>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-primary" onClick={handleUpdateNote}>Update Note</button>
              </div>
            </div>
          </div>
        </div>
    <div className='row'>
    {note.map((notes)=>{
        return <NoteItem key={notes._id} updateNote={updateNote} notes={notes}/>
    })}
    </div>
  </>

  )
}

export default Notes
