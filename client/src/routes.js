import React from 'react';
import { Route, IndexRoute } from 'react-router';

/* containers */
import { App } from 'containers/App';
import { AllRecipes } from 'containers/AllRecipes';
import { HomePage  } from 'containers/HomePage';
import { Dashboard } from 'containers/Dashboard';
import { DigiFridge } from 'containers/DigiFridge';

export default (
  <Route path="/" component={App}>
    <IndexRoute component={HomePage} />
    <Route path="dashboard" component={Dashboard} />
    <Route path="recipes" component={AllRecipes} />
    <Route path="fridge" component={DigiFridge} />
    <Route status={404} path="*" component={HomePage} />
  </Route>
);
