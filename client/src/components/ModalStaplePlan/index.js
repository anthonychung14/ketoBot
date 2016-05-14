import React, { Component } from 'react';
import { Modal } from 'react-bootstrap'
import ModalRecipeForm from 'components/ModalRecipeForm'
import { PlannerCalorieCount } from 'components/PlannerCalorieCount'

import { addStaplePlan, hidePlanModal } from '../../actions/modalActions'

export class ModalStaplePlan extends Component {
  constructor(props) {
    super(props);
  }

  render() {    
    if (!this.props.modalPlan) { return ( <span/>) }
    var staple = this.props.modalProps
    const initialServings = {initialValues: {recipeServings: 1}}
    return (
      <Modal 
          bsSize="large" 
          dialogClassName="modalStaplePlan" 
          show={this.props.modalPlan} onHide={this.props.hideModal}>
      <Modal.Header>
        <h3>Add to meal plan</h3>
      </Modal.Header>
      <Modal.Body>
        <h3>{staple.recipe.title}</h3>        
        <ModalRecipeForm
          {...initialServings}
          recipe={staple}          
          hideModal={this.props.hideModal}/>        
        <PlannerCalorieCount 
            chosenRecipes={this.props.chosenRecipes.chosenRecipes}
            servingMap={this.props.chosenRecipes.servingMap}/>
      </Modal.Body>
    </Modal>  
    )
  }
}

