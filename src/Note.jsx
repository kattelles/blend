import React, { Component } from 'react';
import ReactModal from "react-modal";

class Note extends Component {
  constructor() {
    super();
    this.state = {
      modalOpen: false,
    };

    this.modalClose = this.modalClose.bind(this);
    this.modalOpen = this.modalOpen.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
  }

  modalClose() {
    this.setState({modalOpen: false});
  }

  modalOpen() {
    this.setState({modalOpen: true});
  }

  handleEdit() {
    this.props.editNote(this.props.note);
  }

  handleDelete() {
    this.props.deleteNote(this.props.note.id)
  }

  render() {
    return (
      <div>
        <div className="note">
          <div className={this.props.note.color}></div>
          <div className="note-header">
            <div className='note-title'>{this.props.note.title}</div>
            <div className='icons'>
              <img onClick={this.handleEdit} src="./img/edit.png"/>
              <img onClick={this.modalOpen} src="./img/delete.png"/>
            </div>
          </div>
          <div className='note-body'>{this.props.note.body}</div>
        </div>

        <ReactModal
          contentLabel="delete"
          className="delete-modal"
          isOpen={this.state.modalOpen}
          onRequestClose={this.modalClose}
          onAfterOpen={this.modalOpen}>

          <div className='delete-title'>Delete Note</div>
          <div className='delete-body'>
            Are you sure you want to delete this note?
          </div>
          <div className='modal-bottom'>
            <button className="button cancel"
                  onClick={this.modalClose}>
                  Cancel
            </button>
            <button
                  className="button add"
                  onClick={this.handleDelete}>
                  Delete
            </button>
          </div>

        </ReactModal>
      </div>
    );
  }
}

export default Note;
