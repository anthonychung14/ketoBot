import React from 'react';
import { Route, IndexRoute } from 'react-router';

/* containers */
import { App } from 'containers/App';
import { Home } from 'containers/Home';
import { Dashboard } from 'containers/Dashboard';
import { Groceries } from 'containers/Groceries';


export default (
  <Route path="/" component={App}>
    <IndexRoute component={Home} />
    <Route path="dashboard" component={Dashboard} />
    <Route path="groceries" component={Groceries} />
    <Route status={404} path="*" component={Home} />
  </Route>
);
