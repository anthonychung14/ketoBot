import React, { Component, PropTypes } from 'react'
import { reduxForm } from 'redux-form'

export const fields = [ 'days', 'meals', 'freeCal' ]
const validate = values => {
  const errors = {}
  if (!values.days) {
    errors.days = 'Required'
  }
  if (!values.meals) {
    errors.meals = 'Required'
  }
  return errors
}

class WizardFormSecondPage extends Component {
  render() {
    const {
      fields: { days, meals, freeCal },
      handleSubmit,
      previousPage
    } = this.props
    return (<form onSubmit={handleSubmit}>
        <div>
          <label>How many days are we planning?</label>
          <div>
            <input type="number" placeholder="should have checkboxes" {...days}/>
          </div>
          {days.touched && days.error && <div>{days.error}</div>}
        </div>
        <div>
          <label>How many meals per day?</label>
          <div>
            <input type="number" placeholder="should have checkboxes" {...meals}/>          
          </div>
            {meals.touched && meals.error && <div>{meals.error}</div>}
        </div>
         <div>
          <label>Free calories per day?</label>
          <div>
            <input type="number" placeholder="should have checkboxes" {...freeCal}/>          
          </div>
            {freeCal.touched && freeCal.error && <div>{freeCal.error}</div>}
        </div>            
        
        <div>
          <button type="button" onClick={previousPage}>
            <i/> Previous
          </button>
          <button type="submit">
            Next <i/>
          </button>
        </div>
      </form>
    )
  }
}

WizardFormSecondPage.propTypes = {
  fields: PropTypes.object.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  previousPage: PropTypes.func.isRequired
}

export default reduxForm({
  form: 'userPlan',              // <------ same form name
  fields,                      // <------ only fields on this page
  destroyOnUnmount: false,     // <------ preserve form data
  validate                     // <------ only validates the fields on this page
})(WizardFormSecondPage)