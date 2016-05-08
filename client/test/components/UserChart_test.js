import { expect } from '../test_helper';
import React from 'react/addons';
import ReactDOM from 'react-dom'
let TestUtils = React.addons.TestUtils;

import UserChart from '../../src/components/UserChart'

describe('UserChart - static behavior test', () => { 
  var component;
  var renderedDOM;

  beforeEach(() => {      
      component = TestUtils.renderIntoDocument( <UserChart initialName="secondtest"/>);
      renderedDOM = () => ReactDOM.findDOMNode(component);
  });

  it('renders children', () => {
    expect(renderedDOM().children.length).to.equal(2)
  })

  it('renders a react D3 chart', () => {
    let renderedChart = renderedDOM().querySelectorAll(".rd3-legend-chart");
    expect(renderedChart.length).to.equal(1);
  });
});

