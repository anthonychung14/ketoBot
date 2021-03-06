import React, { Component, PropTypes } from 'react';

import { RecipeInfo } from '../RecipeInfo'

/* component styles */
import { styles } from './styles.scss';
import { Modal } from 'react-bootstrap'

export class RecipeModal extends Component {
  static contextTypes = {
    router: PropTypes.object
  }

  constructor(props) {
    super(props);    
  }


  addPlan() {    
    let approvedItem = {
      recipe: this.props.modalState.activeItem.recipe,
      nutrition: this.props.modalState.activeItem.nutrition,
      ingreds: this.props.modalState.activeItem.ingreds
    }
    
    this.props.addStaplePlan(approvedItem, 1)    
    this.props.openModal()
    this.context.router.push('planner')
  }

  render() {                
    const activeItem = this.props.modalState.activeItem || []
    const nutrition = activeItem.nutrition
    const ingreds = activeItem.ingreds
    if (!this.props.modalState.openDisplay) { return ( <span/>) }    
    return (
       <Modal show={this.props.modalState.openDisplay} onHide={this.props.openModal}>        
        <Modal.Header>
          <h3>Add to Meal Plan</h3>
        </Modal.Header>
        <Modal.Body>                      
            <RecipeInfo recipe={this.props.modalState.activeItem} />          
            <button onClick={(event) => this.addPlan(event)}>Add to plan</button>      
        </Modal.Body>
      </Modal>    
    );
  } 
}
