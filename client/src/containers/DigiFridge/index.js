import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'

/* actions */ 
import { addStaplePlan } from '../../actions/items'
import { fetchFridge } from '../../actions/fridgeActions'
import { fetchStaples } from '../../actions/createMealPlan'
import { addPlanModal, hidePlanModal, formModal, stapleModal, closePlanModal } from '../../actions/modalActions'

/* components */
import { Fridge } from 'components/Fridge'
import { FridgeModal } from 'components/FridgeModal'
import { StapleWindow } from 'components/StapleWindow'
import { StapleModal } from 'components/StapleModal'
import { ModalStaplePlan }from 'components/ModalStaplePlan'

/* styling */      
import { styles } from './styles.scss';
import Tabs from 'material-ui/lib/tabs/tabs';
import Tab from 'material-ui/lib/tabs/tab';
import SwipeableViews from 'react-swipeable-views';


function mapStateToProps(state) {
  return {     
    modalState: state.modalState,
    fridgeItems: state.fridge.fridgeItems,
    stapleData: state.staples.stapleData,
    modalStaple: state.modalStaple,
    chosenRecipes: state.mealPlan    
  };
}

function mapDispatchToProps(dispatch) {
  const actions = {
    fetchFridge, 
    fetchStaples, 
    formModal, 
    stapleModal, 
    addStaplePlan,
    addPlanModal,    
    hidePlanModal,
    closePlanModal
    }
  return { actions: bindActionCreators(actions, dispatch)}
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
          <Tab label="Staples" value={0} />            
          <Tab label="Fridge" value={1} />
        </Tabs>                  
        <SwipeableViews
          className="tabView"
          index={this.state.slideIndex}
          onChangeIndex={this.handleChange}>
        <div className='tabView'>
          <StapleWindow 
              fetchFridge={this.props.actions.fetchFridge}
              fetchStaples={this.props.actions.fetchStaples}
              stapleModal={this.props.actions.stapleModal}
              addStaplePlan={this.props.actions.addStaplePlan} 
              modalState= {this.props.modalState}
              fridgeItems={this.props.fridge}
              stapleData={this.props.stapleData}
              addPlanModal={this.props.actions.addPlanModal}
              modalPlan={this.props.modalStaple.modalState}
              hideModal={this.props.actions.hidePlanModal}/>/>              
          <StapleModal 
              modalState={this.props.modalState}
              stapleModal={this.props.actions.stapleModal} 
              fridgeItems={this.props.fridgeItems}/>
          <ModalStaplePlan 
              className="modalStaplePlan"
              modalPlan={this.props.modalStaple.modalState}
              modalProps={this.props.modalStaple.modalProps}
              hideModal={this.props.actions.hidePlanModal}
              closeModal={this.props.actions.closePlanModal}
              chosenRecipes={this.props.chosenRecipes}/>          
        </div>
        <div className="tabView">            
          <Fridge 
              openModal={this.props.actions.formModal}/>
          <button onClick={this.props.actions.formModal}>Add to Fridge</button>
          <FridgeModal 
            modalState={this.props.modalState}
            openModal={this.props.actions.formModal}/>
        </div>
        </SwipeableViews>
      </section>
    );
  }
}
