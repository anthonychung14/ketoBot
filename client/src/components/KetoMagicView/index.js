import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'
import * as actionCreators from '../../actions/ketoMagicMealActions'
        
import { styles } from './styles.scss';
import { KetoMagicUser } from 'components/KetoMagicUser'

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
          <h3>Directions</h3>                                
          <button onClick={this.props.sendForAlgo} className="">Press The Button</button>
          <button className="">Yes I approve!</button>
          <button className="">Show me another</button>

          <KetoMagicUser sendForAlgo={this.sendForAlgo.bind(this)} />
      </section>      
    );
  }
}
