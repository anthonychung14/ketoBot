import React, { Component } from 'react';
import * as actionCreators from '../../actions/userPlan'

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'

/* component styles */
import { styles } from './styles.scss';


function mapStateToProps(state) {
  return { searchResults: state.search };
}

function mapDispatchToProps(dispatch) {
  return { actions: bindActionCreators(actionCreators, dispatch)}
}

@connect(mapStateToProps, mapDispatchToProps)

export class Search extends Component {
  componentWillMount () {
    console.log(this.props)
    //fetch user data and display it somewhere?
    //make it live on the state
  }

  handleClick() {
    console.log("props back", this.props.searchResults)
  }

  render() {
    return (
      <section className={`${styles}`}>
        <div>
        <h1>Search for something</h1>
        <input type="text"></input>
        <button onClick={this.handleClick.bind(this)}>Search Box</button>        
        </div>
      </section>
    );
  }
}