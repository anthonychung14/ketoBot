import { expect } from '../test_helper';
import { RecipeInfo } from '../../src/components/RecipeInfo'
import TestUtils from 'react-addons-test-utils';
import React from 'react/addons';

describe('RecipeInfo - static behavior test', () => { 
  var component;
  var renderedDOM;

  beforeEach(() => {      
      component = TestUtils.renderIntoDocument(<RecipeInfo initialName="my first test" />);
      renderedDOM = () => React.findDOMNode(component);
  });

  it('renders children', () => {
    expect(renderedDOM().children.length).to.equal(1)
  })

  it('contains 5 anchor links', () => {
    let renderedParagraphs = renderedDOM().querySelectorAll("a");
    expect(renderedParagraphs.length).to.equal(5);
  });
});

