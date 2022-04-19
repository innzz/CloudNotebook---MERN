import React from 'react'
import { useContext } from 'react';
import noteContext from '../context/notes/noteContext';

function Home() {
  const context = useContext(noteContext);
  const {note,setNote} = context;
  return (
    <div className='container my-4'>
      <h1>Add Note</h1>
      <form>
        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
          <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"/>
          <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
          <input type="password" className="form-control" id="exampleInputPassword1"/>
        </div>
        <div className="mb-3 form-check">
          <input type="checkbox" className="form-check-input" id="exampleCheck1"/>
          <label className="form-check-label" htmlFor="exampleCheck1">Check me out</label>
        </div>
        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
    <h1>Your Notes</h1>
    {note.map((notes)=>{
        return <h1 key={notes.title}>{notes.title}</h1>
    })}
    </div>
  )
}

export default Home
