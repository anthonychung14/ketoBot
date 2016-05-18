import React, { Component, PropTypes } from 'react'
import WizardFormFirstPage from './WizardFormFirstPage'
import WizardFormSecondPage from './WizardFormSecondPage'
import WizardFormThirdPage from './WizardFormThirdPage'
import { ButtonCircle } from 'rebass'
import Icon from 'react-geomicons'

import { styles } from './styles.scss';

class WizardForm extends Component {
  constructor(props) {
    super(props)

    // Pro tip: The best place to bind your member functions is in the component constructor
    this.nextPage = this.nextPage.bind(this)
    this.previousPage = this.previousPage.bind(this)
    this.state = {
      page: 1
    }
  }

  nextPage() {
    this.setState({ page: this.state.page + 1 })
  }

  previousPage() {
    this.setState({ page: this.state.page - 1 })
  }

  renderButton(){
    if (this.state.page < 2) {
      return (      
      <div>
      <ButtonCircle type="submit" onClick={this.nextPage} title="next">
      <Icon
        fill="currentColor"
        height="2em"
        name="chevronRight"
        width="2em"/>
      </ButtonCircle>
      <h5>Next</h5>       
      </div>
      )
    } else if (this.state.page ===2) {
      return (
      <div>
        <ButtonCircle type="submit" title="next">
          <Icon
            fill="currentColor"
            height="2em"
            name="check"
            width="2em"/>
        </ButtonCircle>
        <h5>Submit</h5>
        </div>
      )
    }
  }

  render() {    
    const { onSubmit } = this.props
    const { page } = this.state
    return (
      <section className={`${styles}`}>        
      <h3>Edit your goals!</h3>
      <div>
        {page === 1 && <WizardFormFirstPage onSubmit={this.nextPage}/>}        
        {page === 2 && <WizardFormSecondPage previousPa2ge={this.previousPage} onSubmit={this.nextPage}/>}
        {page === 3 && <WizardFormThirdPage previousPage={this.previousPage} onSubmit={onSubmit}/>}
      </div>
      <div className="actions">        
        <div>
        <ButtonCircle onClick={this.props.previousPage} title="cancel">
          <Icon
            fill="currentColor"
            height="2em"
            name="close"
            width="2em"/>
        </ButtonCircle>
        <h5>Cancel</h5>
        </div>
        {this.renderButton()}
        
      </div>
      </section>
    )
  }
}

WizardForm.propTypes = {
  onSubmit: PropTypes.func.isRequired
}

export default WizardForm
