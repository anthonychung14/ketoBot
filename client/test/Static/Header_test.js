import { expect } from '../test_helper';
import { Header } from '../../src/components/Static/Header'
import TestUtils from 'react-addons-test-utils';
import React from 'react/addons';

describe('Header - static behavior test', () => { 
  var component;
  var renderedDOM;

  beforeEach(() => {      
      component = TestUtils.renderIntoDocument(<Header initialName="my first test" />);
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




//   it("wraps a paragraph with a <div> with a proper class name", function() {
//     let rootElement = this.renderedDOM();

//     expect(rootElement.tagName).toEqual("DIV");
//     expect(rootElement.classList.length).toEqual(1);
//     expect(rootElement.classList[0]).toEqual("greeter");
//   });
// });
