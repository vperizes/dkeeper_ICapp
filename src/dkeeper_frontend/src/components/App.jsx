import React, { useState } from "react";
import Header from "./Header.jsx";
import Footer from "./Footer.jsx";
import Note from "./Note.jsx";
import CreateArea from "./CreateArea.jsx";
import { dkeeper_backend } from "../../../declarations/dkeeper_backend";


function App() {
    //array where we keep all notes
    const[allNotes, setNotes] = useState([]);

    //we pass over "note" from create area component using props
    function addNote(note){
        setNotes((prevNotes) => {
            //create note in the ICP backend to persist data
            dkeeper_backend.createNote(note.title, note.noteBody);
            //update frontend with new note
            return[...prevNotes, note];
        });
    }

    function deleteNote(id){
        setNotes((prevNotes) => {
            return prevNotes.filter((note, index) => {
                return index !==id;
            });
        });
    }

    return (
        <div>
            <Header />
            <CreateArea create={addNote}/>
            {allNotes.map((note, index) => {
                return(
                    <Note key={index} id={index} noteTitle={note.title} noteContent={note.noteBody} delete={deleteNote}/>  
                )
            })}
            <Footer />
        </div>
    );
}

export default App;