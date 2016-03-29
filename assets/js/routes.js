import React from 'react';
import { Route, IndexRoute } from 'react-router'

import { App } from './containers/app';

export default(
  <Route path='/' component={App}>
    <IndexRoute component={App} />
    <Route status={404} path="*" component={App} />
  </Route>
)