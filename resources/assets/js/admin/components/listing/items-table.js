import React from 'react';
import style from './style.scss';
import { Sort } from '../../../modules/sort.js';

class ListHead extends React.Component {
    constructor(props) {
        super(props);
    }

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
}

class ItemRow extends React.Component {
    constructor(props) {
        super(props);
    }

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
}

export default class ItemsTable extends React.Component {
    constructor(props) {
        super(props);
        this.sortBy = this.sortBy.bind(this);
    }

    sortBy(arg) {
        var items = Sort.by(this.props.items, arg);
        this.props.updateParentState(items);
    }

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
}
