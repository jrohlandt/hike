import React from 'react';
import style from './style.scss';

import BreadCrumbs from '../breadcrumbs/index.js';
import ItemsTable from '../listing/index.js';

module.exports = React.createClass({
    getInitialState() {
        return {
            items: [],
            columnsToDisplay: ['name', 'grade', 'number']
        };
    },
    updateState(data) {
        // @param data {items: {name: 'john smith'}}
        this.setState(data);
    },
    componentDidMount() {
        //  $.ajax({
        //     url: '/admin/trails',
        //     dataType: 'json',
        //     cache: false,
        //     success: function(res) {
        //         this.setState({items: res.items});
        //     }.bind(this),
        //     error: function(xhr, status, err) {
        //         console.error('/trails', status, err.toString());
        //     }.bind(this)
        // });
        this.setState({items: [
            {id: 6, name: 'Bzba', grade: '4c', number: 7},
            {id: 893, name: 'Baba', grade: '2b', number: 2},
            {id: 867, name: 'Zzba', grade: '2a', number: 6},
            {id: 332, name: 'trail 4', grade: '4b', number: 10},
            {id: 32, name: 'trail 3', grade: '3b', number: 1},
            {id: 4324, name: '200', grade: '3d', number: 11},
            {id: 78, name: '10000000000', grade: '3a', number: 20},
            {id: 45, name: 'zAba', grade: '1a', number: 3}
        ]});
    },
    render() {
        return (
            <div>
                <BreadCrumbs />
                <ItemsTable
                    items={this.state.items}
                    columnsToDisplay={this.state.columnsToDisplay}
                    updateParentState={this.updateState}
                />
            </div>
        );
    }
});
