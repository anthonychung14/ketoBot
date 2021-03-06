import React, { Component } from 'react';

/* component styles */
import { styles } from './styles.scss';
import { Modal } from 'react-bootstrap'
import FridgeWizard from 'components/FridgeForm'


export class FridgeModal extends Component {  
  constructor(props) {
    super(props);
  }

  render() {                
    if (!this.props.modalState.openForm) { return ( <span/>) }
      return (
       <Modal show={this.props.modalState.openForm} onHide={this.props.openModal}>        
        <Modal.Header>            
          <h2>Add to Fridge</h2>
        </Modal.Header>
        <Modal.Body>  
          <FridgeWizard />
        </Modal.Body>
      </Modal>    
    );
  } 
}
