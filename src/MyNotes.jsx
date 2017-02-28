import React, { Component } from 'react';
import Note from './Note'
import Modal from './Modal'
import Masonry from 'react-masonry-component';

class MyNotes extends Component {
  constructor() {
    super();
    this.state = {
      notes: {},
      noteCount: 0,
      noteToEdit: false
    };

    this.createNote = this.createNote.bind(this);
    this.deleteNote = this.deleteNote.bind(this);
    this.editNote = this.editNote.bind(this);
    this.saveNote = this.saveNote.bind(this);
  }

  createNote(newNote) {
    newNote['id'] = this.state.noteCount;
    let oldNotes = this.state.notes;
    oldNotes[this.state.noteCount] = newNote;
    let newNoteCount = this.state.noteCount + 1;
    this.setState({
      notes: oldNotes,
      noteCount: newNoteCount
    });
  }

  deleteNote(id) {
    let notesHash = this.state.notes;
    delete notesHash[id];
    this.setState({notes: notesHash});
  }

  editNote(note) {
    this.setState({noteToEdit: note});
  }

  saveNote(note) {
    let notes = this.state.notes;
    let keys = Object.keys(notes);
    keys.forEach(key => {
      if (note.id.toString() === key){
        notes[key] = note;
      }
    });

    this.setState({
      notes: notes,
      noteToEdit: false
    });
  }

  render() {
    let notes = [];
    let keys = Object.keys(this.state.notes);
    keys.forEach(key => {
      let note = this.state.notes[key];
      notes.push(<Note
                  deleteNote={this.deleteNote}
                  editNote={this.editNote}
                  key={note.id}
                  note={note}
              />)
    });

    return (
      <div>
        <Modal
          noteToEdit={this.state.noteToEdit}
          createNote={this.createNote}
          saveNote={this.saveNote}/>
        <Masonry>{notes}</Masonry>
      </div>
    );
  }
}

export default MyNotes;
