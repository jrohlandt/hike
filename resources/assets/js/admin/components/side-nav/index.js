import React from 'react';
var Router = require('react-router');
var RouteHandler = Router.RouteHandler;
import { Link, IndexLink } from 'react-router';
import style from './style.scss';

export default class SideNav extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            display: true,
            className: 'side-nav-expand'
        }

        this.toggleDisplay = this.toggleDisplay.bind(this);
    }

    toggleDisplay() {
        if (this.state.display === true) {
            this.setState({display: false, className: 'side-nav-shrink'});
        } else {
            this.setState({display: true, className: 'side-nav-expand'});
        }
    }

    render() {
        return (
            <div id="side-nav" className={this.state.className} >
                <div id="logo-container" onClick={this.toggleDisplay}>HIKE</div>
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
