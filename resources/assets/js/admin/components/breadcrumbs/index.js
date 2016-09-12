import React from 'react';
import style from './style.scss';

export default class BreadCrumbs extends React.Component {
    render() {
        return (
            <div className="breadcrumbs-component">
                <h1>{this.props.heading}</h1>
            </div>
        );
    }
}
