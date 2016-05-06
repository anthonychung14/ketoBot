import React, { Component } from 'react';
import { Modal } from 'react-bootstrap'
import ModalRecipeForm from 'components/ModalRecipeForm'


import { addStaplePlan, hidePlanModal } from '../../actions/modalActions'

export class ModalStaplePlan extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    if (!this.props.modalPlan) { return ( <span/>) }

    var staple = this.props.modalProps
    return (
      <Modal show={this.props.modalPlan} onHide={this.props.hideModal}>
      <Modal.Header>
        <h3>Add to meal plan</h3>
      </Modal.Header>
      <Modal.Body>
        <h3>{staple.recipe.title}</h3>        
        <ModalRecipeForm
          recipe={staple}          
          hideModal={this.props.hideModal}/>
      </Modal.Body>
    </Modal>  
    )
  }
}