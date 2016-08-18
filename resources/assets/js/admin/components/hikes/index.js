import React from 'react';
import style from './style.scss';

import BreadCrumbs from '../breadcrumbs/index.js';
import ItemsTable from '../listing/index.js';

module.exports = React.createClass({
    getInitialState() {
        return {
            items: [],
            columnsToDisplay: ['title', 'grade']
        };
    },
    componentDidMount() {
        this.setState({items: [
            {id: 1, title: 'hike 1', grade: '4b'},
            {id: 55, title: 'hike 2', grade: '1a'}
        ]});
    },
    render() {
        return (
            <div>
                <BreadCrumbs />
                <ItemsTable
                    items={this.state.items}
                    columnsToDisplay={this.state.columnsToDisplay}
                />
            </div>
        );
    }
});
