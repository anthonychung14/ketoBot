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
  
  render() {
    return (
      <section className={`${styles}`}>        
        <div className="searchColumn">        
          <h2>Search</h2>
          <SearchForm/>
        </div>
        
        <div classNme="searchResults">
          <SearchResults 
            recData={this.props.recData}/>
        </div>
        
        
        
      </section>
    );
  }
}
