import React from 'react';
import style from './style.scss';

var ListHead = React.createClass({
    render() {
        var headings = [];

        this.props.columnsToDisplay.forEach((heading) => {
            headings.push(
                <th
                    key={heading + Date.now()}
                    onClick={this.props.orderBy.bind(null, heading)}
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
    isNumber(val) {
        // console.log(val, parseFloat(val), Number(val), Number.isNaN(Number(val)));
        return Number.isNaN(Number(val)) === false;
    },
    isNotNumber(val) {
        return this.isNumber(val) === false;
    },
    handleSorting(items, arg) {
        return items.sort((a,b) => {
            var A = a[arg];
            var B = b[arg];

            if (this.isNotNumber(A) && this.isNotNumber(B)) {
                A = A.toUpperCase();
                B = B.toUpperCase();

                if (A < B) {
                    return -1;
                }

                if (A > B) {
                    return 1;
                }

                // equal
                return 0;

            } else if (this.isNumber(A) && this.isNumber(B)) {
                return Number(A) - Number(B);
            }else if (this.isNumber(A) && this.isNotNumber(B)) {
                return -1;
            } else if (this.isNotNumber(A) && this.isNumber(B)) {
                return 1;
            }

        });
    },
    orderBy(arg) {
        var items = this.handleSorting(this.props.items, arg);

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
                    orderBy={this.orderBy}
                />
                <tbody>
                    {rows}
                </tbody>
            </table>
        );
    }
});

module.exports = ItemsTable;
