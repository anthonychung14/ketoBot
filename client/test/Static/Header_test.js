import { expect } from '../test_helper';
import { Header } from '../../src/components/Static/Header'
import TestUtils from 'react-addons-test-utils';
import React from 'react/addons';

describe('Header' , () => { 
  var renderedComponent;

  before('render and locate element', function() {
    renderedComponent = TestUtils.renderIntoDocument(
      <Header done={false} name="header"/>
    )});


  it('has the correct class', () => {
    expect(renderedComponent).to.contain('test')  
  })

  it('contains the right text', () => {
    expect('A').to.contain('A');
  });
});
