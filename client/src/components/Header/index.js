import React, { Component } from 'react';
import { Link } from 'react-router';

/* component styles */
import { styles } from './styles.scss';

export class Header extends Component {
  render() {
    return (
      <header className={`${styles}`}>
        <div className="container">
          <div className="row">
            <div className="col-xs-5 col-sm-3 col-md-3 col-lg-3 logo">
              <Link to="/">
                ketoHome
              </Link>
            </div>

            <div className="col-xs-5 col-sm-5 col-md-5 col-lg-5">
              <nav>
                <Link to="/dashboard" activeClassName="active">
                  Dashboard
                </Link>
                <Link to="/home" activeClassName="active">
                  Recipe Queue
                </Link>
                <Link to="/groceries" activeClassName="active">
                  Grocery Stack
                </Link>
              </nav>
            </div>
          </div>
        </div>
      </header>
    );
  }
}
