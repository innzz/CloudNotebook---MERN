import React from 'react'
import AddNote from './AddNote';
import Notes from "./Notes";

function Home(props) {
  const {showAlertMessage,changeProgress}=props;
  return (
    <div className='container my-4'>
      <AddNote showAlertMessage={showAlertMessage} changeProgress={changeProgress}/>
    <div className="container my-3">
    <h1>Your Notes</h1>
    <Notes showAlertMessage={showAlertMessage} changeProgress={changeProgress}/>
    </div>
    </div>
  )
}

export default Home
