import React, { Component } from 'react';

/* component styles */
import { styles } from './styles.scss';
import { StapleShow } from 'components/StapleShow'
import { ModalStaplePlan } from 'components/ModalStaplePlan'
import { ButtonCircle } from 'rebass'
import Icon from 'react-geomicons'



export class StapleWindow extends Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    this.props.fetchFridge()
    this.props.fetchStaples()
  }

  render() {
    return (
     <div>
       <h2>Weekly staples</h2>
       <ButtonCircle onClick={this.props.stapleModal} title="addStaple">
          <Icon
            fill="currentColor"
            height="2em"
            name="compose"
            width="2em"/>
        </ButtonCircle>
        <h5>Add Staple</h5>
       <StapleShow
            stapleData = {this.props.stapleData}
            addStaplePlan={this.props.addStaplePlan}
            addPlanModal={this.props.addPlanModal}/>      
     </div>
    );
  }
}