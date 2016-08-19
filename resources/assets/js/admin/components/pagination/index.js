import React from 'react';
import style from './style.scss';

var PaginationButtons = React.createClass({
    render() {
        var lastPageNum = this.props.data.last_page;
        var maxButtons = 10;
        var numberOfButtons = (lastPageNum <= maxButtons ? lastPageNum : maxButtons);
        var range = [...Array(numberOfButtons).keys()];

        var buttons = [];;
        range.forEach((key) => {
            var pageNum = key + 1;

            buttons.push(
                <li
                    onClick={this.props.updateParentPage.bind(null,pageNum)}
                    key={"paginate"+pageNum}
                >
                    {pageNum}
                </li>
            );
        });

        console.log(buttons);
        return (
            <div>
                <ul>
                    {buttons}
                </ul>
            </div>
        );
    }
});

var PaginationComponent = React.createClass({
    render() {
        if (Object.keys(this.props.data).length < 1) {
            return (<div className="pagination-component"></div>);
        }

        return (
            <div className="pagination-component">
                <PaginationButtons
                    data={this.props.data}
                    updateParentPage={this.props.updateParentPage}
                />
            </div>
        );
    }
});

module.exports = PaginationComponent;
