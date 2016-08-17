var React = require('react');
var Router = require('react-router');
var RouteHandler = Router.RouteHandler;
var SideNav = require('../components/side-nav/index.js');
import style from './style.scss';

var Component = React.createClass({
  render() {
    return (
      <div>
        <SideNav />
        <div id='content'>{this.props.children}</div>
      </div>
    );
  }
});

module.exports = Component;
