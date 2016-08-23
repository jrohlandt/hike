import React from 'react';
import style from './style.scss';
import { Sort } from '../../../../modules/sort.js';

const HeadItem = (props) => props.children;

class TableHead extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        var headings = [];

        this.props.columnsToDisplay.forEach((heading) => {
            headings.push(
                <HeadItem key={heading} >
                    <th onClick={this.props.sortBy.bind(null, heading)} >
                        {heading}
                    </th>
                </HeadItem>
            );
        });

        return (<thead><tr>{headings}</tr></thead>);
    }
}

class Column extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (<td>{this.props.children}</td>);
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
            columns.push(
                <Column key={column+item.id}>
                        {item[column]}
                </Column>
            );
        });

        return (<tr>{columns}</tr>);
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
                    key={item.id}
                    item={item}
                    columnsToDisplay={this.props.columnsToDisplay}
                />
            );
        });

        return (
            <table className="listing-component">
                <TableHead
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
