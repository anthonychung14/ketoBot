import React, { Component } from 'react';

/* component styles */
import { styles } from './styles.scss';
import { Modal } from 'react-bootstrap'

export class RecipeModal extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const activeItem = this.props.modalState.activeItem || "none"
    console.log(activeItem)
    return (
       <Modal className="payment" show={this.props.modalState.open} onHide={this.props.openModal}>        
        <Modal.Body>            
          {activeItem.title}
        </Modal.Body>
      </Modal>    
    );
  }
}