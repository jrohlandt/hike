import React from 'react';
import { Router } from 'react-router';
var RouteHandler = Router.RouteHandler;
import SideNav from '../components/side-nav';
import style from './style.scss';

export default class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            sideNavClassName: 'side-nav-expand',
            contentSize: 'content-size-shrink'
        }

        this.toggleSideNav = this.toggleSideNav.bind(this);
    }

    toggleSideNav() {
        if (this.state.sideNavClassName === 'side-nav-expand') {
            this.setState({sideNavClassName: 'side-nav-shrink'});
            this.setState({contentSize: 'content-size-expand'});
        } else {
            this.setState({sideNavClassName: 'side-nav-expand'});
            this.setState({contentSize: 'content-size-shrink'});
        }
     }

    render() {
        return (
            <div id="app-wrapper">
                <SideNav
                    className={this.state.sideNavClassName}
                    toggleDisplay={this.toggleSideNav}
                />
            <div id="content" className={this.state.contentSize} >
                    {this.props.children}
                </div>
            </div>
        );
    }
}
