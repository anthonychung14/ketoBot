import React, { Component } from 'react';

/* global styles for app */
import './styles/app.scss';

/* application components */
import { Header } from 'components/Static/Header';
import { Footer } from 'components/Static/Footer';

export class App extends Component {
  static propTypes = {
    children: React.PropTypes.any,
  };

  render() {
    return (
      <section>
        <Header />
        {this.props.children}
      </section>
    );
  }
}
