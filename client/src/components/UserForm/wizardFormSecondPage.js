import React, { Component, PropTypes } from 'react'
import { reduxForm } from 'redux-form'
export const fields = [ 'time', 'preference' ]

const validate = values => {
  const errors = {}
  if (!values.time) {
    errors.time = 'Required'
  }
  return errors
}

class WizardFormSecondPage extends Component {
  render() {
    const {
      fields: { time, preference },
      handleSubmit,
      previousPage
    } = this.props
    return (<form onSubmit={handleSubmit}>
        <div>
          <label>time</label>
          <div>
            <input type="text" placeholder="should have checkboxes" {...time}/>
          </div>
          {time.touched && time.error && <div>{time.error}</div>}
        </div>
        <div>                             
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
  form: 'wizard',              // <------ same form name
  fields,                      // <------ only fields on this page
  destroyOnUnmount: false,     // <------ preserve form data
  validate                     // <------ only validates the fields on this page
})(WizardFormSecondPage)