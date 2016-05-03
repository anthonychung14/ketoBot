import React, { Component } from 'react';
import { reduxForm, addArrayValue } from 'redux-form'
import PureInput from './PureInput'

import { createStaple, fetchStaples } from '../../../actions/createMealPlan'

/* component styles */
import { styles } from './styles.scss';

export const fields = [
  'stapleTitle',
  'ingredient[].name',
  'ingredient[].servings' 
]

class StapleForm extends Component {    

  submitStaple(props) {          
    let ingredData = []
    props.ingredient.forEach(element => {
      this.props.fridgeItems.forEach(ingred => {
        if(ingred.name === element.name) {
          ingredData.push(ingred)
        }
      })  
    })
    
    this.props.closeModal()
    this.props.createStaple(props, ingredData).then(() => this.props.fetchStaples())
  }

  generateServings(ingred) {
    let numArray = [];
    let value = ingred.value || []
    let selectedItem = this.props.fridgeItems.filter(element => element.name === value)[0] || {servings:0}
    for (var i = 1; i <= selectedItem.servings; i++) {      
        numArray.push(i)      
    }
    return numArray
  }

  render() {
    //TODO: DISPLAY CALORIES OF STAPLE AS THEY FILL IN FORM

    const { fields: { stapleTitle, ingredient }, handleSubmit, submitting } = this.props;    
    return (              
        <section className={`${styles}`}>
        <form onSubmit={handleSubmit(this.submitStaple.bind(this))}>                    
          <label>Staple Title</label>
          <PureInput type="text" placeholder="Name your staple" field={stapleTitle} {...stapleTitle}/>
          {!ingredient.length && <div>No ingredient yet</div>}
          {ingredient.map((ingred, index) => <div key={index}>
            <label>Ingredient #{index +1}</label>                      
             <select field={ingred.name} {...ingred.name} onUpdate={this.generateServings(ingred.name)}>
              {this.props.fridgeItems
                .map((item, index) => {
                  return <option key={index} value={item.name}>{item.name}</option>})}
            </select>
            <select field={ingred.servings} {...ingred.servings}>
              {this.generateServings(ingred.name).map(i => <option key={i}>{i}</option>)}
            </select>                                                      
          </div>
          )}
          <button type="button" onClick={() => {
            ingredient.addField()    // pushes empty child field onto the end of the array
          }}><i/> Add Ingredient
          </button>
        <button type="submit" disabled={submitting}>
            {submitting ? <i/> : <i/>} Submit
          </button>          
        </form>
        </section>
    );
  }
}

export default reduxForm({
  form: 'stapleForm',
  fields 
}, null, { createStaple, fetchStaples })(StapleForm);

