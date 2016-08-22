import React from 'react';
import { render } from 'react-dom';
import { Router, Route, IndexRoute, Link, browserHistory} from 'react-router';
import style from './sass/all.scss';

// Components to use in routes
import App from './app';
import Dashboard from './components/dashboard/index.js';
import HikesListing from './components/hikes/index.js';
import TrailsListing from './components/trails/index.js';

var routes = (
  <Router history={browserHistory} >
    <Route path="/admin" component={App} >
      <IndexRoute component={Dashboard} />
      <Route path="hikes" component={HikesListing} />
      <Route path="trails" component={TrailsListing} />
    </Route>
  </Router>
);

render(routes, document.getElementById('app'));
