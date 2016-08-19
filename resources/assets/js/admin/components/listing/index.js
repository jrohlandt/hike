import React from 'react';
import style from './style.scss';
import { Sort } from '../../../modules/sort.js';

var ListHead = React.createClass({
    render() {
        var headings = [];

        this.props.columnsToDisplay.forEach((heading) => {
            headings.push(
                <th
                    key={heading + Date.now()}
                    onClick={this.props.sortBy.bind(null, heading)}
                >
                    {heading}
                </th>
            );
        });

        return (
            <thead>
                <tr>
                    {headings}
                </tr>
            </thead>
        );
    }
});

var ItemRow = React.createClass({
    render() {
        var columns = [];

        this.props.columnsToDisplay.forEach((column) => {
            var item = this.props.item;
            columns.push(<td key={column+item.id}>{item[column]}</td>);
        });

        return (
            <tr>
                {columns}
            </tr>
        );
    }
});

var ItemsTable = React.createClass({
    sortBy(arg) {
        var items = Sort.by(this.props.items, arg);
        this.props.updateParentState({items});
    },
    
    render() {
        var rows = [];
        this.props.items.forEach((item) => {
            rows.push(
                <ItemRow
                    item={item}
                    columnsToDisplay={this.props.columnsToDisplay}
                    key={item.id}
                />
            );
        });

        return (
            <table className="listing-component">
                <ListHead
                    columnsToDisplay={this.props.columnsToDisplay}
                    sortBy={this.sortBy}
                />
                <tbody>
                    {rows}
                </tbody>
            </table>
        );
    }
});

module.exports = ItemsTable;
