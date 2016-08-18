var React = require('react');
var Router = require('react-router');
var RouteHandler = Router.RouteHandler;
import { Link, IndexLink } from 'react-router';
import style from './style.scss';

var Component = React.createClass({
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
});

module.exports = Component;
