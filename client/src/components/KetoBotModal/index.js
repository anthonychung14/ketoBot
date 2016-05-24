import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

/* component styles */
import { styles } from './styles.scss';
import { Modal } from 'react-bootstrap'

import { Card, CardImage, Heading, Text, ButtonCircle } from 'rebass'
import { Table, Thead, Th, Tr, } from 'Reactable'

import { postFinalMealPlan } from 'actions/createMealPlan'
import { openModal } from 'actions/modalActions'

import Spinner from 'react-spinkit'
import Icon from 'react-geomicons'

function mapStateToProps(state) {
  return {    
    mealPlan: state.mealPlan
  }
}

function mapDispatchToProps(dispatch) {  
  return { actions: bindActionCreators({openModal, postFinalMealPlan}, dispatch)}
}

@connect(mapStateToProps, mapDispatchToProps)
export class KetoBotModal extends Component {  
  static contextTypes = {
    router: PropTypes.object
  }
  
  constructor(props) {
    super(props);
  }

  confirm(element, key) {        
    this.props.openModal()
    //Move this logic to a selector next
    let fridgeMeal = this.props.mealPlan.fridgeFill.map((element, key) => {
      return {
        id: element.id
      }
    })
    let servingMap = this.props.mealPlan.servingMap
    let recipeMeal = this.props.mealPlan.chosenRecipes.map((element, key) => {      
      return {
        id: element.recipe.id,
        name: element.recipe.recipe.title,
        time: element.recipe.recipe.time,
        staple: element.recipe.recipe.staple,
        servings: servingMap[element.recipe.recipe.id],
        nutrition: {
          protein: element.recipe.nutrition.protein,
          fat: element.recipe.nutrition.fat,
          carbs: element.recipe.nutrition.net_carb}
      }
    })

    let finalMeal = {
      id: element.id,
      protein: element.totals.protein,
      carbs: element.totals.carbs,
      fat: element.totals.fat,
      totals: element.calories,
      fridge: []
    }

    this.props.actions.postFinalMealPlan(element)
    this.context.router.push('dashboard')
  }

  renderResults() {
    if(this.props.mealPlanArray.length === 0) {
      return (
        <div className={`${styles}`}>
        <h4>Beep boop beep boop</h4>
        <h4>I am calculating!</h4>
        <Spinner spinnerName='wandering-cubes'/> <Spinner spinnerName='wandering-cubes'/>
        <Spinner spinnerName='wandering-cubes'/>                
        </div>
      )
    } else {
      return (
        this.props.mealPlanArray.map((element, key) => this.renderTable(element, key))
      )
    }
  }

  renderTable(element, key) {
    let diffData = {      
      "Protein": element.diff.protein,
      "Carbs": element.diff.carbs,
      "Fat": element.diff.fat
    }
    const boundElement= element   

    return(
        <Card className="card" rounded={true} width={350} key={key}>      
        <Table className="table" data={[diffData]}/>              
        <Table className="table" data={element.items.map((element, key) => {
          return {Servings: element.servings, Name: element.name}
        })}/>
        <button onClick={event => this.confirm(boundElement)}>Hi</button>      
        </Card>
    )  
  }
  
  render() {                
    if (!this.props.modalState.openDisplay) { return ( <span/>) }
      return (
      <section >
       <Modal
          show={this.props.modalState.openDisplay} 
          onHide={this.props.openModal}
          dialogClassName={`${styles}`}>
        <Modal.Header dialogClassName={`${styles}`}>            
          <h2>KetoBot Activated</h2>
        </Modal.Header>
        <Modal.Body dialogClassName={`${styles}`}>            
          <div className="bodyDiv">
          {this.renderResults()}
          </div>
        </Modal.Body>
      </Modal>    
      </section>
    );
  } 
}
