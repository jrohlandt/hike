import React from 'react';
import { Router } from 'react-router';
var RouteHandler = Router.RouteHandler;
import SideNav from '../components/side-nav';
import style from './style.scss';

export default class App extends React.Component {
  render() {
    return (
      <div>
        <SideNav />
        <div className='content'>
            {this.props.children}
        </div>
      </div>
    );
  }
}
