import React, { Component } from 'react';
import { ButtonCircle } from 'rebass'
import Icon from 'react-geomicons'


/* component styles */
import { styles } from './styles.scss';
import WizardForm from '../UserForm/wizardForm'

export default class UserData extends Component {  
  constructor(props) {
    super(props) 

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

  renderUserData(userData) {
    return (      
      <div>
        <div> 
          <h2>Nutrition Goals</h2>
          <h3>{userData.calories} calories</h3>        
          <h4>{userData.protein}g protein</h4>
          <h4>{userData.fat}g fat</h4>
          <h4>{userData.carbs}g carbs</h4>
        </div>

        <div>
          <h2>Weekly Goals</h2>
          <h3>Total over {userData.days} days</h3>
          <h3>{(userData.calories * userData.days).toLocaleString()} calories</h3>        
          <h4>{userData.protein * userData.days}g protein</h4>
          <h4>{userData.fat * userData.days}g fat</h4>
          <h4>{userData.carbs * userData.days}g carbs</h4>
        </div>
        
        <ButtonCircle onClick={this.nextPage} title="addStaple">
          <Icon
            fill="currentColor"
            height="2em"
            name="compose"
            width="2em"/>
        </ButtonCircle>
        <h5>Edit Goals</h5>
        </div>
    )
  }

  render() {    
    const { onSubmit } = this.props
    const { page } = this.state
    let userData = this.props.userPlan.userPlan
    return (              
        <section className={`${styles}`}>        
        {page === 1 && this.renderUserData(userData)}        
        {page === 2 && <WizardForm previousPage={this.previousPage} onSubmit={this.nextPage}/>}
        </section>
    );
  }
}

//connect's first arg is mapState to props, mapDispatch to Props
//redux: 1 form config, last two etc
