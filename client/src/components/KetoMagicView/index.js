import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'
import * as actionCreators from '../../actions/ketoMagicMealActions'
        
import { styles } from './styles.scss';

function mapStateToProps(state) {
  return {     
    userData: state.userPlan.userPlan,
    mealPlanArray: state.ketoMealPlan.mealPlanArray    
  }
}

function mapDispatchToProps(dispatch) {
  return { actions: bindActionCreators(actionCreators, dispatch)}
}

@connect(mapStateToProps, mapDispatchToProps)
export class KetoMagicView extends Component {
  constructor(props){
    super(props);      
  }  

  sendForAlgo() {    
    this.props.actions.sendForAlgo(this.props.userData)
  }

  render() {
    return (      
      <section className={`${styles}`}>                              
          <h3>Directions!</h3>                                
          <h4>One day, the algo will be grown up enough to handle all your macros</h4>
          <h4>Till then, please go and choose some staples/fillers before letting the robot work</h4>

          
      </section>      
    );
  }
}

// <KetoMagicUser sendForAlgo={this.sendForAlgo.bind(this)} />