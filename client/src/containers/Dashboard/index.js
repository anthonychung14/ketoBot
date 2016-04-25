import React, { Component } from 'react';
import * as actionCreators from '../../actions/userPlan'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'
import { styles } from './styles.scss';

/* components */
import UserForm from 'components/UserForm';
import UserData from 'components/UserData';
import UserChart from 'components/UserChart'
import HomePage from 'containers/HomePage'
import WizardForm from 'components/UserForm/wizardForm';
        

function mapStateToProps(state) {
  return { 
    userPlan: state.userPlan
  };
}

function mapDispatchToProps(dispatch) {
  return { actions: bindActionCreators(actionCreators, dispatch)}
}

@connect(mapStateToProps, mapDispatchToProps)
export class Dashboard extends Component {
  constructor(props){
    super(props);    
  }

  componentWillMount() {
    this.props.actions.fetchPlan()
  }

  render() {
    return (
      <section className={`${styles}`}>        
        <UserData userPlan={this.props.userPlan}/>
        <UserChart />
      </section>
    );
  }
}

