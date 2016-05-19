import React, { Component } from 'react';

/* component styles */
import { styles } from './styles.scss';
import { Modal } from 'react-bootstrap'

export class KetoBotModal extends Component {  
  constructor(props) {
    super(props);
  }

  renderTable(element, key) {
    console.log(element, key)
  }
  render() {                
    console.log(this.props, "ohai modal")
    if (!this.props.modalState.openDisplay) { return ( <span/>) }
      return (
       <Modal show={this.props.modalState.openDisplay} onHide={this.props.openModal}>        
        <Modal.Header>            
          <h2>KetoBot Activated</h2>
        </Modal.Header>
        <Modal.Body>  
          <h4>Beep bop beep bop</h4>
          {this.props.mealPlanArray.map((element, key) => this.renderTable(element, key))}
        </Modal.Body>
      </Modal>    
    );
  } 
}
