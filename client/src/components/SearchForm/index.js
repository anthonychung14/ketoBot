import React, { Component, PropTypes } from 'react'
import { reduxForm } from 'redux-form'
import { Link } from 'react-router'
import Icon from 'react-geomicons'
import { ButtonCircle } from 'rebass'

import { retrieveSearch } from '../../actions/searchRecipes'

export const fields = [ 'want', 'noWant' ]

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
      <form className="searchColumn" onSubmit={handleSubmit(this.onSubmit.bind(this))}>
        <div>
          <label>Love</label>
          <div>
            <input type="text" {...want} value={want.value}/>
          </div>
        </div>
      
        <div>
          <label>Not feeling</label>
          <div>
            <input type="text" {...noWant} value={noWant.value}/>
          </div>
        </div>
        <div>          
          <ButtonCircle type="submit" disabled={submitting} title="Search">
          <Icon
            fill="currentColor"
            height="2em"
            name="search"
            width="2em"/>
          </ButtonCircle>          
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