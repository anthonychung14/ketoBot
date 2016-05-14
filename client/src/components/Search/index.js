import React, { Component } from 'react';
import * as actionCreators from '../../actions/userPlan'

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'

import SearchForm from 'components/SearchForm'
import SearchResults from 'components/SearchResults'

/* component styles */
import { styles } from './styles.scss';

function mapStateToProps(state) {
  return { 
    searchResults: state.search.searchResults,
    recData: state.recipesUser.recData
  };
}

function mapDispatchToProps(dispatch) {
  return { actions: bindActionCreators(actionCreators, dispatch)}
}

@connect(mapStateToProps, mapDispatchToProps)

export class Search extends Component {
  componentWillMount () {
    
  }

  render() {
    return (
      <section className={`${styles}`}>
        <div>
          <h3>Search for something!</h3>
          <SearchForm />
          <SearchResults 
            recData={this.props.recData}/>
        </div>
        
        
        
      </section>
    );
  }
}
