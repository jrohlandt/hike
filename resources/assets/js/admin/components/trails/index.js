import React from 'react';
import style from './style.scss';

import BreadCrumbs from '../breadcrumbs/index.js';
import ItemsTable from '../listing/index.js';
import PaginationComponent from '../pagination/index.js';

var TrailsContent = React.createClass({
    getInitialState() {
        var baseUrl = '/admin/trails';
        return {
            baseUrl: baseUrl,
            url: baseUrl,
            items: [],
            columnsToDisplay: ['name', 'grade', 'created_at'],
            paginate: {}
        };
    },
    // updatePage
    updatePage(pageNum) {
        var url = this.state.baseUrl + '?page=' + pageNum;
        this.getItems(url);
    },
    // updateState
    // @param data {items: {name: 'john smith'}}
    updateState(data) {
        this.setState({items: data});
    },
    getItems(url) {
        $.ajax({
           url: url,
           dataType: 'json',
           cache: false,
           success: function(res) {
               // res is returned from Laravel ->paginate()
               var items = res.data;
               delete res.data;
               this.setState({items: items, paginate: res});
           }.bind(this),
           error: function(xhr, status, err) {
               console.error('/trails', status, err.toString());
           }.bind(this)
       });
    },
    componentDidMount() {
        this.getItems(this.state.url);
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
                <PaginationComponent
                    data={this.state.paginate}
                    updateParentPage={this.updatePage}
                />
            </div>
        );
    }
});

module.exports = TrailsContent;
