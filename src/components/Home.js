import React from 'react'
import AddNote from './AddNote';
import Notes from "./Notes";

function Home() {
  return (
    <div className='container my-4'>
      <AddNote />
    <div className="container my-3">
    <h1>Your Notes</h1>
    <Notes />
    </div>
    </div>
  )
}

export default Home
