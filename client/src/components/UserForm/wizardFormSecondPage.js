import React, { Component, PropTypes } from 'react'
import { reduxForm } from 'redux-form'
import { Link } from 'react-router'
import { postProcess } from '../../actions/userPlan'
import { ButtonCircle } from 'rebass'
import Icon from 'react-geomicons'

export const fields = [ 'calories', 'fat', 'protein', 'carbs', 'days', 'meals', 'freeCal' ]
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
  static contextTypes = {
    router: PropTypes.object
  }

  onSubmit(props) {
    console.log("did I fire")
    this.props.postProcess(props, this.context.router)    
  }

  render() {
    const {
      fields: { days, meals, freeCal },
      handleSubmit,
      previousPage,
      submitting
    } = this.props
    return (<form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
        <div>
          <label>How many days are we planning?</label>
          <div>
            <input type="number" placeholder="should have checkboxes" {...days}/>
          </div>
        </div>
        <div>
          <label>How many meals per day?</label>
          <div>
            <input type="number" placeholder="should have checkboxes" {...meals}/>          
          </div>
        </div>
         <div>
          <label>Free calories per day?</label>
          <div>
            <input type="number" placeholder="should have checkboxes" {...freeCal}/>          
          </div>
        </div>
        <div>
        <ButtonCircle type="submit" title="submit">
          <Icon
            fill="currentColor"
            height="2em"
            name="check"
            width="2em"/>
        </ButtonCircle>
        <h5>Submit</h5>
        </div>                                    
      </form>
    )
  }
}

WizardFormSecondPage.propTypes = {
  fields: PropTypes.object.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  previousPage: PropTypes.func.isRequired,
  submitting: PropTypes.bool.isRequired
}

export default reduxForm({
  form: 'userPlan',              // <------ same form name
  fields,                      // <------ only fields on this page
  destroyOnUnmount: false,     // <------ preserve form data
                       // <------ only validates the fields on this page
}, null, { postProcess })(WizardFormSecondPage)
