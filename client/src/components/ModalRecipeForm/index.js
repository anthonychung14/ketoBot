import React, { Component, PropTypes } from 'react';
import { reduxForm } from 'redux-form'

import { addStaplePlan } from '../../actions/items'

export const fields = [  
  'recipeServings' 
]

class ModalRecipeForm extends Component {
  static contextTypes = {
    router: PropTypes.object
  }

  submitFoodForm(servings) {        
    this.props.addStaplePlan(this.props.recipe, servings.recipeServings)
    this.props.closeModal()
  }

  handleChange(value){
    this.props.addStaplePlan(this.props.recipe, value)
  }

  render() {
    const { fields: {recipeServings }, handleSubmit, submitting } = this.props
    return (
      <form onChange={(event) => {
        this.handleChange(event.target.value)
      }} onSubmit={handleSubmit(this.submitFoodForm.bind(this))}>
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
        {submitting ? <i/> : <i/>} Add and continue
      </button>         

      </form>
    )
  }
}

export default reduxForm({
  form: 'recipePlanForm',
  fields
}, null, { addStaplePlan })(ModalRecipeForm)