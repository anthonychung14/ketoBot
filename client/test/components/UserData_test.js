import { expect } from '../test_helper';
import React from 'react/addons';
import ReactDOM from 'react-dom'
let TestUtils = React.addons.TestUtils;

import UserData from '../../src/components/UserData'

describe('UserData - static behavior test', () => { 
  var component;
  var renderedDOM;

  const data = {
    userPlan: {
      calories: 10,
      protein: 10,
      fat: 10,
      carbs: 10
    }
  }

  beforeEach(() => {      
      component = TestUtils.renderIntoDocument(<UserData userPlan={data} initialName="thirdTest"/>);
      renderedDOM = () => ReactDOM.findDOMNode(component);
  });

  it('renders children', () => {
    expect(renderedDOM().children.length).to.equal(1)
  })

  it('renders a react D3 chart', () => {
    let renderedChart = renderedDOM().querySelectorAll(".rd3-legend-chart");
    expect(renderedChart.length).to.equal(1);
  });
});

