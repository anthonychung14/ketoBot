import React, { Component } from 'react';

/* component styles */
import { styles } from './styles.scss';
import { Modal } from 'react-bootstrap'
import StapleForm from 'components/StapleForm'

export class StapleModal extends Component {  
  constructor(props) {
    super(props);
  }

  render() {                
    if (!this.props.modalState.openStaple) { return <h1></h1>}
      return (
       <Modal show={this.props.modalState.openStaple} onHide={this.props.stapleModal}>        
        <Modal.Header>            
          <h2>Add Staple Meal</h2>
        </Modal.Header>
        <Modal.Body>  
          <StapleForm 
              fridgeItems={this.props.fridgeItems}
              closeModal = {this.props.stapleModal}
              fetchFridge={this.props.fetchFridge}/>
        </Modal.Body>
      </Modal>    
    );
  } 
}
