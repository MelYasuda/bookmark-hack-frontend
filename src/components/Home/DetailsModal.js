import React, { Component } from 'react';
import Modal from 'react-bootstrap4-modal';

export default class DetailsModal extends Component {
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
    const details = this.props.details;
    return(
      <div>
        <button className='btn btn-success btn-sm details' onClick={this.openModal}>Details</button>
 
        <Modal visible={this.state.open} onClickBackdrop={this.modalBackgroundClicked}>
          <div className="modal-header">
            <h5 className="modal-title">{details.title}</h5>
          </div>
          <div className="modal-body">
            {details.note}
            <div className='bookmark-tags'>
            Tags: {details.tags.map((tag, key)=>(
              <span className='name'>{tag.text}</span>
            ))
            }
          </div>
          <div className='modal-footer'>
            <button className='btn btn-success'>Edit</button>
            <button className='btn btn-primary' onClick={this.onCloseButton}>Close</button>
          </div>
        </div>
      </Modal>
      </div>
    );
  }
}