import Navbar from './components/Navbar';
import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import Home from './components/Home';
import About from './components/About';
import NoteState from './context/notes/NoteState';
import Alert from './components/Alert';
import Login from './components/Login';
import Signup from './components/Signup';
import { useState } from 'react';
import LoadingBar from 'react-top-loading-bar'

function App() {
  const [alertMessage,setalertMessage] = useState(null);
  const [progress,setProgress] = useState(0);

  const changeProgress = (progress)=>{
    setProgress(progress);
  }
  const showAlertMessage = (message,type)=>{
    setalertMessage(
      {
        msg: message,
        type: type
      }
    )
    setTimeout(() => {
      setalertMessage(null);
    },3000);
  }
  return (
    <>
    <NoteState>
    <Router>
    <LoadingBar
        height={3}
        color='#f11946'
        progress={progress}
        />
      <Navbar />
      <Alert alertMessage={alertMessage} />
    <Routes>
      <Route exact path="/" element={<Home showAlertMessage={showAlertMessage} changeProgress={changeProgress} />}/>
      <Route exact path="/About" element={<About showAlertMessage={showAlertMessage}/>}/>
      <Route exact path="/login" element={<Login showAlertMessage={showAlertMessage}/>}/>
      <Route exact path="/signup" element={<Signup showAlertMessage={showAlertMessage}/>}/>
    </Routes>
    </Router>
    </NoteState>
    </>
  );
}

export default App;
