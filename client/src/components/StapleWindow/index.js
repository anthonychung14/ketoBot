import React, { Component } from 'react';

/* component styles */
import { styles } from './styles.scss';
import { StapleShow } from 'components/StapleShow'

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
       <button onClick={this.props.stapleModal}>Add staple meal </button>       
       <StapleShow
            stapleData = {this.props.stapleData}
            addStaplePlan={this.props.addStaplePlan}/>
     </div>
    );
  }
}