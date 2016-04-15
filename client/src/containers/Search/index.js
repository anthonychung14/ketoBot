import React, { Component } from 'react';
import * as actionCreators from '../../actions/items'

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'

/* component styles */
import { styles } from './styles.scss';


function mapStateToProps(state) {
  return { recipes: state.recipes };
}

function mapDispatchToProps(dispatch) {
  return { actions: bindActionCreators(actionCreators, dispatch)}
}

@connect(mapStateToProps, mapDispatchToProps)

export class Search extends Component {
  componentWillMount () {

  }

  handleClick() {
    this.props.actions.searchRecipes()
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