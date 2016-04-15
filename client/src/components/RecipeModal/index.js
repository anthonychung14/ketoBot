import React, { Component } from 'react';

/* component styles */
import { styles } from './styles.scss';
import { Modal } from 'react-bootstrap'

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
          <table>
          <tbody>
            <tr>
              <th>Calories</th>
              <th>Fat</th>
              <th>Protein</th>
              <th>Net Carbs</th>
            </tr>
            <tr>
              <td>{nutrition.calories}</td>
              <td>{nutrition.fat}</td>
              <td>{nutrition.protein}</td>
              <td>{nutrition.net_carb}</td>
            </tr>
          </tbody>
          </table>
        </Modal.Body>
      </Modal>    
    );
  } 
}
