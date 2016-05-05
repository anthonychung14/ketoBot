import React, { Component, PropTypes } from 'react'
import { reduxForm } from 'redux-form'
import { Link } from 'react-router'

import { retrieveSearch } from '../../actions/searchRecipes'

export const fields = [ 'want', 'noWant' ]
// ^^ All fields on last form

const validate = values => {
  const errors = {}
  return errors
}

class SearchForm extends Component {
  static contextTypes = {
    router: PropTypes.object
  }

  onSubmit(props) {
    this.props.retrieveSearch(props)    
  }

  render() {
    const {
      fields: { want, noWant },
      handleSubmit,
      submitting
      } = this.props

    return (
      <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
        <div>
          <label>Something you'd love</label>
          <div>
            <input type="text" {...want} value={want.value}/>
          </div>
        </div>
      
        <div>
          <label>Something you aren't feeling</label>
          <div>
            <input type="text" {...noWant} value={noWant.value}/>
          </div>
        </div>
        <div>          
          <button type="submit" disabled={submitting}>
            {submitting ? <i/> : <i/>} Finish
          </button>
        </div>
      </form>
    )
  }
}

SearchForm.propTypes = {
  fields: PropTypes.object.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  submitting: PropTypes.bool.isRequired
}

export default reduxForm({
  form: 'userPlan',              // <------ same form name
  fields,                      // <------ all fields on last wizard page
  destroyOnUnmount: false,     // <------ preserve form data
  validate                     // <------ only validates the fields on this page
}, null, { retrieveSearch })(SearchForm)