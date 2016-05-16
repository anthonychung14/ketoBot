import React, { Component, PropTypes } from 'react'
import WizardFormFirstPage from './WizardFormFirstPage'
import WizardFormSecondPage from './WizardFormSecondPage'
import WizardFormThirdPage from './WizardFormThirdPage'

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

  render() {
    const { onSubmit } = this.props
    const { page } = this.state
    return (
      <section className={`${styles}`}>        
      <h3>This appears conditionally</h3>
      <div>
        {page === 1 && <WizardFormFirstPage onSubmit={this.nextPage}/>}        
        {page === 2 && <WizardFormSecondPage previousPage={this.previousPage} onSubmit={this.nextPage}/>}
        {page === 3 && <WizardFormThirdPage previousPage={this.previousPage} onSubmit={onSubmit}/>}
      </div>
      <ButtonCircle onClick={this.props.previousPage} title="cancel">
          <Icon
            fill="currentColor"
            height="2em"
            name="close"
            width="2em"/>
        </ButtonCircle>
        <h5>Cancel</h5>      
      </section>
    )
  }
}

WizardForm.propTypes = {
  onSubmit: PropTypes.func.isRequired
}

export default WizardForm
