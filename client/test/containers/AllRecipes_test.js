import { expect } from '../test_helper';
import { AllRecipes } from '../../src/containers/AllRecipes'
import { Recipes } from '../../src/components/Recipes';
import { Search } from '../../src/components/Search'

import TestUtils from 'react-addons-test-utils';
import React from 'react/addons-{addon}';

describe('Recipes - static behavior test', () => { 
  var component;
  var renderedDOM;

  beforeEach(() => {      
      component = TestUtils.renderIntoDocument(<Recipes initialName="my second test" />);
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

