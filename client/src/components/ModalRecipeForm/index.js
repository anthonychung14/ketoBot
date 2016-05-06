import React, { Component } from 'react';
import { reduxForm, addArrayValue } from 'redux-form'

import { addStaplePlan } from '../../actions/items'

export const fields = [  
  'recipeServings' 
]

class ModalRecipeForm extends Component {
  submitFoodForm(servings) {    
    this.props.hideModal()
    this.props.addStaplePlan(this.props.recipe, servings)
  }

  render() {
    const { fields: {recipeServings }, handleSubmit, submitting } = this.props
    return (
      <form onSubmit={handleSubmit(this.submitFoodForm.bind(this))}>
      <label>How many servings?</label>
      <select field={recipeServings} {...recipeServings}>
        <option>1</option>
        <option>2</option>
        <option>3</option>
        <option>4</option>
        <option>5</option>
        <option>6</option>
      </select>

      <button type="submit" disabled={submitting}>
            {submitting ? <i/> : <i/>} Submit
          </button>          
      </form>
    )
  }
}

export default reduxForm({
  form: 'recipePlanForm',
  fields
}, null, { addStaplePlan })(ModalRecipeForm)