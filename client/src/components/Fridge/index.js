import React, { Component } from 'react';
import * as actionCreators from '../../actions/fridgeActions'

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'

/* component styles */
import { styles } from './styles.scss';
import { Card, CardImage, Heading, Text } from 'rebass'
import { Table, Thead, Th, Tr, } from 'Reactable'

function mapStateToProps(state) {
  return {
    fridge: state.fridge.fridgeItems,
    searchFridge: state.fridge.fridgeSearch,
    searchTerms: state.fridge.searchTerms
  }
}

function mapDispatchToProps(dispatch) {
  return {actions: bindActionCreators(actionCreators, dispatch)}
}

@connect(mapStateToProps, mapDispatchToProps)
export class Fridge extends Component {
   constructor(props) {
    super(props);
  }

  componentWillMount () {
    this.props.actions.fetchFridge(this.props.searchTerms)        
  }

  handleClick(event) {
    event.preventDefault();
    const el = event.target.textContent    
    const searchTerms = this.props.searchTerms
    if(searchTerms.indexOf(el) > -1) {
      event.currentTarget.style.backgroundColor = '#fff';
      this.props.actions.delFridgeItem(el, searchTerms)        
    } else {
      event.currentTarget.style.backgroundColor = '#ccc';  
      this.props.actions.addFridgeItem(el)  
    }
  }

  renderItem(element, index) {
    return (
      <li key={index} onClick={element => this.handleClick(element)}>{element.name}</li>
    )
  }

  renderCard(category, index) {
    let filtered = this.props.fridge.filter((item) => item.category === category)
    return (
      <Card rounded={true} width={300} key={index}>      
        <Heading level={2} size={3}>{category}</Heading>
        <Text>
          {filtered.map((element, index) => this.renderItem(element, index))}
        </Text>                              
      </Card>
    )
  }

  render() {
    const categories = [ 'Protein', 'Fats', 'Dairy' , 'Vegetables' ]
    return (
      <section className={`${styles}`}>
        {categories.map((category,index) => this.renderCard(category, index))}
      </section>
    );
  }
}

