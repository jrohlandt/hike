import React from 'react';
import style from './style.scss';
import { Sort } from '../../../../modules/sort.js';
import { Link } from 'react-router';

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
        return (this.props.children);
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
                    <td>
                        <Link
                            to={this.props.baseUrl + '/' + item.id + '/edit'}
                            className={columns.length < 1 ? 'first-link-of-row' : ''}
                        >
                            {item[column]}
                        </Link>
                    </td>
                </Column>
            );
        });
            console.log('dark: ' + this.props.dark);

        return (
            <tr
                className={"listing-component-body-row " + (this.props.dark ? "dark" : "")}
            >
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
        var dark = false;
        this.props.items.forEach((item) => {
            // if (rows.length === 0) {
            //     dark = false;
            // } else {
            //     dark = !dark;
            // }
            // console.log('dark: ' + dark);
            rows.push(
                <ItemRow
                    key={item.id}
                    item={item}
                    dark={dark}
                    columnsToDisplay={this.props.columnsToDisplay}
                    baseUrl={this.props.baseUrl}
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
