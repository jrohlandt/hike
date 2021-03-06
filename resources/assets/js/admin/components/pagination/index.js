import React from 'react';
import style from './style.scss';

class PaginationButtons extends React.Component {
    constructor(props) {
        super(props);
    }

    addPrevAndNextButtons(props, buttonsData) {
        buttonsData.unshift({
            name: 'previous',
            text: 'prev',
            pageNum: (props.current_page - 1),
            class: (props.current_page > 1 ? '' : 'inactive')
        });

        buttonsData.push({
            name: 'next',
            text: 'next',
            pageNum: (props.current_page + 1),
            class: (props.current_page < props.last_page ? '' : 'inactive')
        });

        return buttonsData;
    }

    addButtons() {
        var props = this.props.data;
        var maxButtons = 3;
        var numberOfButtons = (props.last_page <= maxButtons ? props.last_page : maxButtons);

        // TODO fix pagination will only start from 1 not for example from 2

        var buttonsData = [];

        for (var i = 1; i <= numberOfButtons; i++) {
            buttonsData.push({
                name: i,
                pageNum: i,
                text: i,
                class: (i == props.current_page ? 'current' : '')
            });
        }

        buttonsData = this.addPrevAndNextButtons(props, buttonsData);

        var buttons = buttonsData.map((button) => {
            var active = true;
            if ((button.class === 'inactive') || (button.class === 'current')) {
                active = false;
            }
            return (
                <li
                    className={button.class}
                    onClick={active ? this.props.updateParentPage.bind(null,button.pageNum) : null }
                    key={"paginate" + button.name}
                >
                    {button.text}
                </li>
            );
        });

        return buttons;
    }

    render() {
        return (
            <div>
                <ul>
                    {this.addButtons()}
                </ul>
            </div>
        );
    }
}

export default class Pagination extends React.Component {
    constructor(props) {
        super(props);
    }
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
}
