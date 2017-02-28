import React, { Component } from 'react';
import ReactModal from "react-modal";

class Modal extends Component {
  constructor() {
    super();
    this.state = {
      id: false,
      modalOpen: false,
      title: '',
      body: '',
      color: 'pink border',
    };

    this.createNote = this.createNote.bind(this);
    this.saveNote = this.saveNote.bind(this);
    this.modalClose = this.modalClose.bind(this);
    this.modalOpen = this.modalOpen.bind(this);
    this.handleTitleChange = this.handleTitleChange.bind(this);
    this.handleBodyChange = this.handleBodyChange.bind(this);
    this.handleAddOrSave = this.handleAddOrSave.bind(this);
    this.handleColorChange = this.handleColorChange.bind(this);
  }

  componentWillReceiveProps(props) {
    let note = props.noteToEdit;
    if (props.noteToEdit !== this.props.noteToEdit) {
      if (note) {
        this.setState({
          id: note.id,
          modalOpen: true,
          title: note.title,
          body: note.body,
          color: note.color,
        });
      }
    }
  }

  modalClose() {
    this.setState({modalOpen: false});
  }

  modalOpen() {
    this.setState({modalOpen: true});
  }

  createNote() {
    this.modalClose();
    let note = {
      color: this.state.color,
      title: this.state.title,
      body: this.state.body
    };
    this.props.createNote(note);
    this.setState({
      title: '',
      body: ''
    });
  }

  saveNote() {
    this.modalClose();
    let id = this.props.noteToEdit.id;
    let note = {
        id: id,
        color: this.state.color,
        title: this.state.title,
        body: this.state.body
    };
    this.props.saveNote(note);
    this.setState({
      title: '',
      body: '',
      noteToEdit: false,
      modalOpen: false
    });
  }

  handleAddOrSave() {
    if (this.props.noteToEdit) {
      this.saveNote();
    } else {
      this.createNote();
    }
  }

  handleTitleChange(event) {
    event.preventDefault();
    this.setState({title: event.target.value});
  }

  handleBodyChange(event) {
    event.preventDefault();
    this.setState({body: event.target.value});
  }

  handleColorChange(color) {
    let newColor = color + ' border';
    this.setState({color: newColor});
  }

  render() {
    let addOrSave = 'add';
    if (this.props.noteToEdit) {
      addOrSave = 'save';
    }

    let disabled = false;
    if (this.state.title.length === 0) {
      if (this.state.body.length === 0) {
        disabled = true;
      }
    }

    return (
      <div>
        <div onClick={this.modalOpen} className='add-note-button'>
          + Add Note
        </div>
        <ReactModal
          contentLabel="newNote"
          className="modal"
          isOpen={this.state.modalOpen}
          onRequestClose={this.modalClose}
          onAfterOpen={this.modalOpen}>
          <div className={this.state.color}></div>
            <div className="color-box-group">
              <div onClick={() => this.handleColorChange('blue')}
                    className="color-box blue"></div>
              <div onClick={() => this.handleColorChange('pink')}
                    className="color-box pink"></div>
              <div onClick={() => this.handleColorChange('yellow')}
                    className="color-box yellow"></div>
              <div onClick={() => this.handleColorChange('green')}
                    className="color-box green"></div>
            </div>
            <input className="input-title"
              type="text"
              placeholder="Untitled"
              value={this.state.title}
              onChange={this.handleTitleChange}/>
            <textarea className="input-body"
              type="text"
              placeholder="Just start typing here"
              value={this.state.body}
              onChange={this.handleBodyChange}/>
            <div className='modal-bottom'>
              <button className="button cancel"
                    onClick={this.modalClose}>
                    cancel
              </button>
              <button disabled={disabled}
                    className="button add"
                    onClick={this.handleAddOrSave}>
                    {addOrSave}
              </button>
            </div>
        </ReactModal>
      </div>
    );
  }
}

export default Modal;
