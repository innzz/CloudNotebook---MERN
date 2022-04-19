import React, { useContext } from 'react'
import noteContext from '../context/notes/noteContext';

function NoteItem(props) {
    const {notes} = props;
    const {title,description} = notes;
    const context = useContext(noteContext);
    const {deleteNode} = context;

  return (
      <div className="col-md-3 my-3">
        <div className="card">
            <div className="card-body py-4">
                <div className="d-flex justify-content-between">
                <h5 className="card-title">{title}</h5>
                <div style={{position:"absolute",right:"0px",top:"4px"}}>
                <i className="fa-solid fa-trash-can mx-2" onClick={()=>{deleteNode(notes._id)}}></i>
                <i className="fa-solid fa-file-pen mx-2"></i>
                </div>
                </div>
                <p className="card-text">{description}</p>
            </div>
        </div>
      </div>
  )
}

export default NoteItem
