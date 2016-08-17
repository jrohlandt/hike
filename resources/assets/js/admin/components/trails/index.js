import React from 'react';
import style from './style.scss';

import ItemsTable from '../listing/index.js';

module.exports = React.createClass({
    getInitialState() {
        return {
            items: [],
            columnsToDisplay: ['name', 'grading']
        };
    },
    componentDidMount() {
         $.ajax({
            url: '/admin/trails',
            dataType: 'json',
            cache: false,
            success: function(res) {
                this.setState({items: res.items});
            }.bind(this),
            error: function(xhr, status, err) {
                console.error('/trails', status, err.toString());
            }.bind(this)
        });
        // this.setState({items: [
        //     {id: 1, title: 'trail 1', grade: '4b'},
        //     {id: 45, title: 'trail 2', grade: '1a'}
        // ]});
    },
    render() {
        console.log(this.state);
        return (
            <div>
                <p>Trails react</p>
                <ItemsTable
                    items={this.state.items}
                    columnsToDisplay={this.state.columnsToDisplay}
                />
            </div>
        );
    }
});
