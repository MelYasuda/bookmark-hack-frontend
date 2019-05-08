import React, { Component } from 'react';
import Modal from 'react-bootstrap4-modal';
import './CreateBookmark.css';
import CreateForm from './CreateForm';

export default class ModalForm extends Component {
  constructor(props){
    super(props);
    this.state = {
      open: false
    }
  }

  openModal = () => {
    this.setState({ open: true })
  }

  modalBackgroundClicked = () => {
    this.setState({ open: false })
  }

  onCloseButton = () => {
    this.setState({ open: false })
  }

  render() {
    return(
      <div>
        <p className='nav-new' onClick={this.openModal}>New</p>
 
        <Modal visible={this.state.open} onClickBackdrop={this.modalBackgroundClicked}>
        <div className="modal-header">
          <h5 className="modal-title">Create new bookmark</h5>
        </div>
        <div className="modal-body">
          <CreateForm onCloseButton={this.onCloseButton}/>
        </div>
      </Modal>
      </div>
    );
  }
}