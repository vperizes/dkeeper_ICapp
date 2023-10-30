//backend to persist data (note) entries

//need to import List functionality since we are not using exlusively as a type
import List "mo:base/List";
import Debug "mo:base/Debug";

actor DKeeper{

  //creating new data type. Making public so we can access from index.jsx 
  public type Note = {
    title: Text;
    content: Text;
  };

  //var to keep track of all notes (similar to array storage)
  var notes: List.List<Note> = List.nil<Note>(); //creating list to store all note. Initializing as empty.

  public func createNote(titleText: Text, contentText: Text){
    let newNote: Note = {
      title =  titleText;
      content = contentText;
    };

    //pre-append new note to notes list. 
    notes := List.push(newNote, notes);
    Debug.print(debug_show(notes));
  }

}
