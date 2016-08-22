var React = require('react');
import { render } from 'react-dom';
import { Router, Route, IndexRoute, Link, browserHistory} from 'react-router';
import style from './sass/all.scss';

// Components to use in routes
var App = require('./app');
var Dashboard = require('./components/dashboard/index.js');
import HikesListing from './components/hikes/index.js';
// var HikeEdit = require('./components/hikes/edit.js');
var TrailsList = require('./components/trails/index.js');
// var TrailEdit = require('./components/trails/edit.js');

var routes = (
  <Router history={browserHistory} >
    <Route path="/admin" component={App} >
      <IndexRoute component={Dashboard} />
      <Route path="hikes" component={HikesListing} />
      <Route path="trails" component={TrailsList} />
    </Route>
  </Router>
);

render(routes, document.getElementById('app'));
