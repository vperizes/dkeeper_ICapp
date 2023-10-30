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
  //lists are more efficient than arrays on the blockchain
  var notes: List.List<Note> = List.nil<Note>(); //creating list to store all note. Initializing as empty.

  public func createNote(titleText: Text, contentText: Text){
    let newNote: Note = {
      title =  titleText;
      content = contentText;
    };

    //pre-append new note to notes list. 
    notes := List.push(newNote, notes);
    Debug.print(debug_show(notes));
  };

  //async query function that returns an array of notes.
  //converting list to array so that frontend reading data from backend is easier 
  public query func readNotes(): async [Note] {
    return List.toArray(notes);
  };

}
