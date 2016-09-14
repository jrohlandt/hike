import React from 'react';
var Router = require('react-router');
var RouteHandler = Router.RouteHandler;
import { Link, IndexLink } from 'react-router';
import style from './style.scss';

export default class SideNav extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div id="side-nav" className={this.props.className} >
                <div id="logo-container" onClick={this.props.toggleDisplay}>HIKE</div>
                <ul className="side-nav-links">
                    <li>
                        <IndexLink to="/admin" activeClassName="side-nav-link-active" >dashboard</IndexLink>
                    </li>
                    <li>
                        <Link to="/admin/hikes" activeClassName="side-nav-link-active" >hikes</Link>
                    </li>
                    <li>
                        <Link to="/admin/trails" activeClassName="side-nav-link-active" >trails</Link>
                    </li>
                    <li>
                        <a href="#" >exposures</a>
                    </li>
                    <li>
                        <a href="#" >severities</a>
                    </li>
                </ul>
            </div>
        );
    }
}
