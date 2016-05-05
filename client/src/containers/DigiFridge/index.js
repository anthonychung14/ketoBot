import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'
import * as actionCreators from '../../actions/items'

/* components */
import { Fridge } from 'components/Fridge'
import { FridgeModal } from 'components/FridgeModal'
import { FridgeSearch } from 'components/FridgeSearch'

import { StapleWindow } from '../../components/staple/StapleWindow'

        
import { styles } from './styles.scss';

import Tabs from 'material-ui/lib/tabs/tabs';
import Tab from 'material-ui/lib/tabs/tab';
import SwipeableViews from 'react-swipeable-views';


function mapStateToProps(state) {
  return {     
    modalState: state.modalState };
}

function mapDispatchToProps(dispatch) {
  return { actions: bindActionCreators(actionCreators, dispatch)}
}

@connect(mapStateToProps, mapDispatchToProps)
export class DigiFridge extends Component {
  constructor(props){
    super(props);   
    this.state={
      slideIndex: 0
    } 
  }

  handleChange = (value) => {
    this.setState({
      slideIndex: value,
    });
  };

  render() {
    return (
      <section className={`${styles}`}>
        <Tabs
          className="tabs"
          onChange={this.handleChange}
          value={this.state.slideIndex}>
          <Tab label="Fridge" value={0} />            
          <Tab label="Staples" value={1} />
        </Tabs>                  
        <SwipeableViews
          className="tabView"
          index={this.state.slideIndex}
          onChangeIndex={this.handleChange}>
        <div className="tabView">            
          <Fridge openModal={this.props.actions.formModal}/>
          <button onClick={this.props.actions.formModal}>Add to Fridge</button>
          <FridgeModal 
            modalState={this.props.modalState}
            openModal={this.props.actions.formModal}/>
        </div>
        <div className='tabView'>
          <StapleWindow />
        </div>
        </SwipeableViews>
        <FridgeSearch />
      </section>
    );
  }
}
