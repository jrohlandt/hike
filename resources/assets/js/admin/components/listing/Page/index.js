import React from 'react';
import style from './style.scss';

import Alert from '../../alert';
import BreadCrumbs from '../../breadcrumbs';
import ItemsTable from '../ItemsTable';
import ActionsRow from '../ActionsRow';
import Pagination from '../../pagination';

export default class ListingPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            itemType: props.itemType || 'item',
            baseUrl: props.baseUrl,
            url: props.baseUrl,
            items: [],
            columnsToDisplay: props.columnsToDisplay,
            paginate: {}
        };
        this.updateState = this.updateState.bind(this);
        this.updatePage = this.updatePage.bind(this);
    }

    // updatePage
    // get items for paginated page
    updatePage(pageNum) {
        var url = this.state.baseUrl + '?page=' + pageNum;
        this.getItems(url);
    }

    // updateState
    // @param data {items: {name: 'john smith'}}
    updateState(data) {
        this.setState({items: data});
    }

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
               console.error(this.state.url, status, err.toString());
           }.bind(this)
       });
    }

    componentDidMount() {
        this.getItems(this.state.url);
    }

    render() {
        return (
            <div>
                <Alert />
                <BreadCrumbs />
                <ItemsTable
                    items={this.state.items}
                    columnsToDisplay={this.state.columnsToDisplay}
                    updateParentState={this.updateState}
                    baseUrl={this.state.baseUrl}
                />
                <ActionsRow
                    itemType={this.state.itemType}
                    baseUrl={this.state.baseUrl}
                />
                <Pagination
                    data={this.state.paginate}
                    updateParentPage={this.updatePage}
                />
            </div>
        );
    }
}
