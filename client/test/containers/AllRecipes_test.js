import { expect } from '../test_helper';
import TestUtils from 'react-addons-test-utils';
import React from 'react/addons';

import { AllRecipes } from '../../src/containers/AllRecipes'



describe('Container for all recipes - static behavior test', () => { 
  var component;
  var renderedDOM;

  beforeEach(() => {      
      component = TestUtils.renderIntoDocument(<AllRecipes initialName="my second test" />);
      renderedDOM = () => React.findDOMNode(component);
  });

  it('renders children', () => {
    expect(renderedDOM().children.length).to.equal(3)
  })

  it('contains 5 anchor links', () => {
    let renderedParagraphs = renderedDOM().querySelectorAll("a");
    expect(renderedParagraphs.length).to.equal(5);
  });
});

