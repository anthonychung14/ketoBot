import React, { Component, PropTypes } from 'react';

/* component styles */
import { styles } from './styles.scss';
import { Modal } from 'react-bootstrap'

// const userMacros = {
//   calories: 2000,
//   fat: 150,
//   protein: 120,
//   carbs: 50
// } 

export class RecipeModal extends Component {
  static contextTypes = {
    router: PropTypes.object
  }

  constructor(props) {
    super(props);    
  }


  addPlan(event, activeItem) {    
    this.context.router.push("planner")
  }

  displayIngredients(active){
    return (
      <ul>
        {active.ingreds.map(element => <li key={element.name}>{element.amount + element.measurement + element.name}</li>)}
      </ul>
    )
  }
  displayNutrition(active) {
    return (
      <ul>
        <li>{active.nutrition.calories} calories</li>
        <li>{active.nutrition.protein} protein</li>
        <li>{active.nutrition.fat} fat</li>
        <li>{active.nutrition.net_carb} carbs</li>
      </ul>
    )
  }


  render() {                
    const activeItem = this.props.modalState.activeItem || []
    const nutrition = activeItem.nutrition
    const ingreds = activeItem.ingreds
    if (!this.props.modalState.open) { return ( <span/>) }    
    return (
       <Modal show={this.props.modalState.open} onHide={this.props.openModal}>        
        <Modal.Header>
          <h3>{activeItem.recipe.title}</h3>
        </Modal.Header>
        <Modal.Body>            
          <div className="modalColumn">
            <div className="ingredients">
            <h3>List of Ingredients</h3>
                {this.displayIngredients(activeItem)}
            </div>
            <div className="nutrition">
              <h3>Nutrition</h3>              
                {this.displayNutrition(activeItem)}                        
            </div>
          </div>
          <button onClick={(event) => this.addPlan(event)}>Add to plan</button>      
        </Modal.Body>
      </Modal>    
    );
  } 
}
