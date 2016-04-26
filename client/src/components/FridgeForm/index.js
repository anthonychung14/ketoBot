import React, { Component, PropTypes } from 'react'

//Import pages
import FridgeForm1 from './FridgeForm1'
import FridgeForm2 from './FridgeForm2'

import { styles } from './styles.scss';

class FridgeWizard extends Component {
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
      <div>
        {page === 1 && <FridgeForm1 onSubmit={this.nextPage}/>}        
        {page === 2 && <FridgeForm2 previousPage={this.previousPage} onSubmit={onSubmit}/>}
      </div>
      </section>
    )
  }
}

FridgeWizard.propTypes = {
  onSubmit: PropTypes.func.isRequired
}

export default FridgeWizard
