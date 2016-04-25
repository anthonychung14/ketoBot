import React, { Component } from 'react';

/* component styles */
import { styles } from './styles.scss';
import { Modal } from 'react-bootstrap'

const userMacros = {
  calories: 2000,
  fat: 150,
  protein: 120,
  carbs: 50
} 

export class RecipeModal extends Component {
  constructor(props) {
    super(props);
  }

  render() {                
    if (!this.props.modalState.open) { return ( <span/>) }
    const activeItem = this.props.modalState.activeItem
    const nutrition = activeItem.nutrition    
    return (
       <Modal show={this.props.modalState.open} onHide={this.props.openModal}>        
        <Modal.Body>            
          <h2>List of Ingredients</h2>
              <ul>
                <li>1 Chicken</li>
                <li>2 lbs rice</li>
                <li>3 sticks of butter</li>
              </ul>            
          <button>Add to plan</button>      
        </Modal.Body>
      </Modal>    
    );
  } 
}
