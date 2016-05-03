import React, { Component, PropTypes } from 'react'
import { reduxForm } from 'redux-form'

export const fields = [ 'calories', 'fat', 'protein', 'carbs' ]
const validate = values => {
  const errors = {}
  if (!values.calories) {
    errors.calories = 'Required'
  } else if (values.calories.length > 15) {
    errors.calories = 'Form validation thing son'
  }
  if (!values.fat) {
    errors.fat = 'Required'
  } else if (values.fat.length > 15) {
    errors.fat = 'Form validation thing son'
  }
  if (!values.protein) {
    errors.protein = 'Required'
  } else if (values.protein.length > 15) {
    errors.protein = 'Form validation thing son'
  }
  if (!values.carbs) {
    errors.carbs = 'Required'
  } else if (values.carbs.length > 15) {
    errors.carbs = 'Form validation thing son'
  }
  return errors
}

class WizardFormFirstPage extends Component {
  render() {
    const {
      fields: { calories, fat, protein, carbs },
      handleSubmit
    } = this.props
    return (
      <form onSubmit={handleSubmit}>
        <div>
          <label>Calories</label>
          <div>
            <input type="text" placeholder="Calories" {...calories}/>
          </div>
        </div>
        
        <div>
          <label>Fat (g)</label>
          <div>
            <input type="text" placeholder="Fat" {...fat}/>
          </div>
        </div>
        
        <div>
        <label>Protein (g)</label>
        <div>
          <input type="text" placeholder="Protein" {...protein}/>
        </div>
        </div>
        
        <div>
          <label>Carbs (g)</label>
          <div>
            <input type="text" placeholder="Carbs" {...carbs}/>
          </div>
        </div>        
        
        <div>
          <button type="submit">
            Next <i/>
          </button>
        </div>
      </form>
    )
  }
}

WizardFormFirstPage.propTypes = {
  fields: PropTypes.object.isRequired,
  handleSubmit: PropTypes.func.isRequired
}

export default reduxForm({
  form: 'userPlan',              // <------ same form name
  fields,                      // <------ only fields on this page
  destroyOnUnmount: false,     // <------ preserve form data
  validate                     // <------ only validates the fields on this page
})(WizardFormFirstPage)

// {calories.touched && calories.error && <div>{calories.error}</div>}
