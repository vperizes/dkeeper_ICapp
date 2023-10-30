import React, { useState } from "react";

function CreateArea(props) {

    //creating an object that tracks the state of the input to make a note
    const[note, setNote] = useState({
        title: "",
        content:""
    });

    function updateNote(event){
        //getting the name and value attribute of the element that triggered event
        const inputName = event.target.name;
        const inputValue = event.target.value;

        setNote((prevNote) => {
            if(inputName === "title"){
                return{
                    title: inputValue,
                    content:prevNote.content
                };
            } else if(inputName === "content"){
                return{
                    title: prevNote.title,
                    content: inputValue
                };
            }
        });
    }

    function submitNote(event){
        event.preventDefault();
            props.create(note);
            setNote({
                title: "",
                content: ""
            });
    }

  return (
    <div>
      <form className="create-note">
        <input onChange={updateNote} name="title" placeholder="Title" value={note.title}/>
        <textarea onChange={updateNote} name="content" placeholder="Take a note..." rows="3" value={note.content}/>
        <button onClick={submitNote}>Add</button>
      </form>
    </div>
  );
}

export default CreateArea;