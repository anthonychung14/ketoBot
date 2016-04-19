import React, { Component, PropTypes } from 'react'
import { reduxForm } from 'redux-form'
import { Link } from 'react-router'

import { postProcess } from '../../actions/userPlan'

export const fields = [ 'calories', 'fat', 'protein', 'carbs', 'days', 'meals', 'freeCal', 'want', 'noWant' ]
// ^^ All fields on last form

const validate = values => {
  const errors = {}
  return errors
}

class WizardFormThirdPage extends Component {
  static contextTypes = {
    router: PropTypes.object
  }

  onSubmit(props) {
    this.props.postProcess(props)    
  }

  render() {
    const {
      fields: { want, noWant },
      handleSubmit,
      previousPage,
      submitting
      } = this.props
    return (
      <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
        <div>
          <label>Something you'd love</label>
          <div>
            <select {...want} value={want.value || ''}>
              <option value="">Anything!</option>
              <option value="chicken">Chicken</option>
              <option value="beef">Beef</option>
              <option value="fish">Fish</option>
            </select>
          </div>
        </div>
      
        <div>
          <label>Something you aren't feeling</label>
          <div>
            <input type="text" {...noWant} value={noWant.value || ''}/>
          </div>
        </div>
        <div>
          <button type="button" disabled={submitting} onClick={previousPage}>
            <i/> Previous
          </button>
          <button type="submit" disabled={submitting}>
            {submitting ? <i/> : <i/>} Finish
          </button>
        </div>
      </form>
    )
  }
}

WizardFormThirdPage.propTypes = {
  fields: PropTypes.object.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  previousPage: PropTypes.func.isRequired,
  submitting: PropTypes.bool.isRequired
}

export default reduxForm({
  form: 'userPlan',              // <------ same form name
  fields,                      // <------ all fields on last wizard page
  destroyOnUnmount: false,     // <------ preserve form data
  validate                     // <------ only validates the fields on this page
}, null, { postProcess })(WizardFormThirdPage)