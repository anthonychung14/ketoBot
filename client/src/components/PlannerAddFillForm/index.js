import React, { Component, PropTypes } from 'react';
import { reduxForm } from 'redux-form'

import { addFillerPlan } from '../../actions/items'
import { subtractFillerPlan } from '../../actions/items'

import { Card, Heading, ButtonCircle } from 'rebass'
import Icon from 'react-geomicons'

export const fields = [  
  'fillerServings' 
]

class AddFillForm extends Component {
  submitFoodForm(servings) {            
    this.props.addFillerPlan(this.props.filler, servings.fillerServings)
  }

  handleChange(){        
    console.log("do the thing")
    this.props.subtractFillerPlan(this.props.filler)
  }

  render() {
    const { fields: { fillerServings }, handleSubmit, submitting } = this.props
    return (
      <form onSubmit={handleSubmit(this.submitFoodForm.bind(this))}>
      <div className="actions">
      <ButtonCircle onClick={this.handleChange.bind(this)} type="button" disabled={submitting } title="No">
        <Icon          
          fill="currentColor"
          height="1em"
          name="no"
          width="1em"/>
      </ButtonCircle>

      <label>Servings</label>
      <select field={fillerServings} {...fillerServings} value={fillerServings.value || 1}>
        <option>1</option>
        <option>2</option>
        <option>3</option>
        <option>4</option>
        <option>5</option>
        <option>6</option>
      </select>
            
      <ButtonCircle type="submit" disabled={submitting} title="Add">
        <Icon
          fill="currentColor"
          height="1em"
          name="check"
          width="1em"/>
      </ButtonCircle>       

      </div>
      </form>
    )
  }
}

export default reduxForm(
{ fields }, ((state, props) => props.form), { addFillerPlan, subtractFillerPlan })(AddFillForm)


