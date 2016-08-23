import React from 'react';
import { Router } from 'react-router';
var RouteHandler = Router.RouteHandler;
import { Link, IndexLink } from 'react-router';
import style from './style.scss';

export default class ActionRow extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="actions-row-component">
                <ul>
                    <li>
                        <Link to={`${this.props.baseUrl}/create`}>
                            {`New ${this.props.itemType}`}
                        </Link>
                    </li>
                </ul>
            </div>
        );
    }
}
