import React, { Component } from 'react';

/* component styles */
import { styles } from './styles.scss';
import WizardForm from '../UserForm/wizardForm'


export default class UserData extends Component {  
  constructor(props) {
    super(props) 
  }

  handleClick() {
    console.log("hi")
    
  }
  
  render() {    
    let userData = this.props.userPlan.userPlan
    return (              
        <section className={`${styles}`}>        
        <div> 
          <h2>Nutrition Goals~</h2>
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

        <button onClick={this.handleClick}>Edit Goals</button>
        </section>
    );
  }
}

//connect's first arg is mapState to props, mapDispatch to Props
//redux: 1 form config, last two etc
