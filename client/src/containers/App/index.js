import React, { Component, PropTypes } from 'react';

/* global styles for app */
import { styles } from './styles/app.scss';

/* application components */
import { Header } from 'components/Static/Header';
import { Footer } from 'components/Static/Footer';

import mui from 'material-ui'
import ThemeManager from 'material-ui/lib/styles/theme-manager';
import Colors from 'material-ui/lib/styles/colors';
import customTheme from './styles/customTheme.js'

export class App extends Component {
  static childContextTypes = {
    muiTheme: React.PropTypes.object,
  };

  static propTypes = {
    children: React.PropTypes.any,
  };

  getChildContext() {
    return {
      muiTheme: ThemeManager.getMuiTheme(customTheme)
    };
  }

  render() {
    return (
      <section className={`${styles}`}>
        <Header />
        {this.props.children}
      </section>
    );
  }
}
