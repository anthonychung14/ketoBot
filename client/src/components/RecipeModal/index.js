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
          <h3>Calculate leftover</h3>
          <table>
            <tbody>
              <tr>
                <th></th>
                <th>Calories</th>
                <th>Fat</th>
                <th>Protein</th>
                <th>Net Carbs</th>
              </tr>
              <tr>
                <td>Your calorie needs</td>
                <td>{userMacros.calories}</td>
                <td>{userMacros.fat}</td>
                <td>{userMacros.protein}</td>
                <td>{userMacros.carbs}</td>
              </tr>
              <tr>
                <td>{activeItem.recipe.title}</td>
                <td>{nutrition.calories}</td>
                <td>{nutrition.fat}</td>
                <td>{nutrition.protein}</td>
                <td>{nutrition.net_carb}</td>
              </tr>
              <tr>
                <td>REMAINING</td>
                <td>CALORIES</td>
                <td>FAT</td>
                <td>PROTEIN</td>
                <td>NETCARBS</td>
              </tr>
            </tbody>
          </table>
          <button>Add to plan</button>      
        </Modal.Body>
      </Modal>    
    );
  } 
}
