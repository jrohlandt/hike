import React from 'react';
var Router = require('react-router');
var RouteHandler = Router.RouteHandler;
import { Link, IndexLink } from 'react-router';
import style from './style.scss';

export default class SideNav extends React.Component {
  render() {
    return (
      <div id="side-nav">
          <div id="logo-container">HIKE</div>
          <ul>
              <li>
                  <IndexLink to="/admin">dashboard</IndexLink>
              </li>
              <li>
                  <Link to="/admin/hikes">hikes</Link>
              </li>
              <li>
                  <Link to="/admin/trails">trails</Link>
              </li>
          </ul>
      </div>
    );
  }
}
