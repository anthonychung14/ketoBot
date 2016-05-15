import React, { Component } from 'react';
import * as actionCreators from '../../actions/fridgeActions'

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'

/* component styles */
import { styles } from './styles.scss';
import { Card, CardImage, Heading, Text, ButtonCircle } from 'rebass'
import Icon from 'react-geomicons'

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

// THIS FEATURE SHOULD BE MOVED TO THE "CREATE/ADD" PLACE. Should not be a "search feature"
// THINK OF IT LIKE MANAGEMENT
// You should be able to add staples here based on the foods in your fridge then
//   <Text>
//   {filtered.map((element, index) => this.renderItem(element, index))}
// </Text>
//   renderItem(element, index) {
//     return (
//       <li key={index} onClick={element => this.handleClick(element)}>{element.name}</li>
//     )
//   }

  renderRow(element, index) {
    return {
      'Available': element['servings'],
      'Name': element['name'],
      'Calories': element['calories']
    }
  }

  renderCard(category, index) {
    let filtered = this.props.fridge.filter((item) => item.category === category)
    return (
      <Card rounded={true} width={"40%"} key={index}>      
        <Heading level={2} size={3}>{category}</Heading>        
        <Table className="table" sortable={true} itemsPerPage={4} data={filtered.map((element, index) => this.renderRow(element, index))} />                  
      </Card>
    )
  }

  render() {
    const categories = [ 'Protein', 'Fats', 'Dairy' , 'Vegetables' ]
    return (
      <div>
        <h2>Inventory</h2>
        <ButtonCircle onClick={this.props.openModal} title="Add">
          <Icon
           fill="currentColor"
           height="2em"
           name="compose"
           width="2em"/>
          </ButtonCircle>
        <h5>Add to Fridge</h5>        
        <div className={`${styles}`}>
          {categories.map((category,index) => this.renderCard(category, index))}
        </div>
      </div>
    );
  }
}




