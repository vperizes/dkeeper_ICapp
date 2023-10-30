import React, { useState, useEffect } from "react";
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
            dkeeper_backend.createNote(note.title, note.content);
            //update frontend with new note, place new note to the front of array (pre-append).
            return[note,...prevNotes];
        });
    }

    //triggered everytime render function is called in react
    //passing an empty array as the second arguement tells useEffect to run only once
    useEffect(() => {
        //calling async function, doing this seperatly since use effect can not be turned into async function
        fetchData();
    }, []);

    async function fetchData(){
        const notesArray = await dkeeper_backend.readNotes();

        //updating allNotes -> triggers re-render since the state is bring updated
        setNotes(notesArray);
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
                    <Note key={index} id={index} noteTitle={note.title} noteContent={note.content} delete={deleteNote}/>  
                )
            })}
            <Footer />
        </div>
    );
}

export default App;