//backend to persist data (note) entries

//need to import List functionality since we are not using exlusively as a type
import List "mo:base/List";
import Debug "mo:base/Debug";

actor DKeeper {

  //creating new data type. Making public so we can access from index.jsx
  public type Note = {
    title : Text;
    content : Text;
  };

  //var to keep track of all notes (similar to array storage)
  //lists are more efficient than arrays on the blockchain
  //make var stable so that it persists across canister upgrades (i.e. when running dfx deploy)
  stable var notes : List.List<Note> = List.nil<Note>(); //creating list to store all note. Initializing as empty.

  public func createNote(titleText : Text, contentText : Text) {
    let newNote : Note = {
      title = titleText;
      content = contentText;
    };

    //pre-append new note to notes list.
    notes := List.push(newNote, notes);
    Debug.print(debug_show (notes));
  };

  //async query function that returns an array of notes.
  //converting list to array so that frontend reading data from backend is easier
  public query func readNotes() : async [Note] {
    return List.toArray(notes);
  };

  //function for removing/deleting a note. passing in id (natural num)
  public func removeNote(id : Nat) {

    //this will return the elements from the list up to the specified index (ex. id == 2, new list inludes element 0 and 1)
    let notes_take = List.take(notes, id);

    //this will return a new list with the element start at the index of the id + 1
    //ex. id == 2, new is equal to element 3,...n (we're drop all element before id + 1)
    let notes_drop= List.drop(notes, id + 1);

    //appending the two lists with out the note of id specified for removal
    return notes:= List.append(notes_take, notes_drop);
  };
};
