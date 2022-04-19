import noteContext from "./noteContext";
import { useState } from "react";

const NoteState = (props)=>{
    const notes = 
    [
        {
          "_id": "625ea2238454f624772da942",
          "user": "625dd26af502c165ec6d672d",
          "title": "hie i am 3 title",
          "description": "hie i  3 am description",
          "tag": "personal",
          "date": "2022-04-19T11:50:59.052Z",
          "__v": 0
        },
        {
          "_id": "625ea27a8454f624772da946",
          "user": "625dd26af502c165ec6d672d",
          "title": "hie i am 4 title",
          "description": "hie i  4 am description",
          "tag": "personal",
          "date": "2022-04-19T11:52:26.532Z",
          "__v": 0
        },
        {
          "_id": "625ea2828454f624772da948",
          "user": "625dd26af502c165ec6d672d",
          "title": "hie i am 5 title",
          "description": "hie i  5 am description",
          "tag": "personal",
          "date": "2022-04-19T11:52:34.169Z",
          "__v": 0
        }
      ];

      const [note,setNote] = useState(notes);
    return (
        <noteContext.Provider value={{note,setNote}}>
            {props.children}
        </noteContext.Provider>
    )
};

export default NoteState;