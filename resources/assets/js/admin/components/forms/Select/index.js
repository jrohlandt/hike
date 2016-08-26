import React from 'react';
import ReactDOM from 'react-dom';
import style from './style.scss';

import ValidationError from '../ValidationError';
import Label from '../Label';

const Option = (props) => props.children;

export default class FormSelect extends React.Component {
    constructor(props) {
        super(props);

        this.state = {show: false};

        this.toggleShowHide = this.toggleShowHide.bind(this);
        this.handleBlur = this.handleBlur.bind(this);
    }

    static propTypes = {
        id: React.PropTypes.string.isRequired,
        name: React.PropTypes.string.isRequired,
        options: React.PropTypes.array.isRequired,
        handleSelect: React.PropTypes.func.isRequired
    }

    handleClick(inputName, inputValue) {
        this.props.handleSelect(inputName, inputValue);
        this.toggleShowHide();
    }

    handleBlur() {
        // make sure <ul> is not shown after blur
        // setTimeout: allows this.handleClick to run first
        setTimeout(() => {
            this.setState({show: false});
        }, 200);
    }

    toggleShowHide(e) {
        this.setState({show: !this.state.show});

    }

    render() {
        var props = this.props;
        var options = props.options.map((option) => {
            return (
                <Option key={props.name + option.id} >
                    <li
                        className={props.selected == option.id ? 'selected' : ''}
                        onClick={this.handleClick.bind(this, props.name, option.id)}
                    >
                        { option.description }
                    </li>
                </Option>
            );
        });

        var selectedValue = props.options.filter((option) => option.id == props.selected);
        selectedValue = selectedValue[0] != undefined ? selectedValue[0].description : '-- select --';
        return (
            <div className="input-group">
                <Label for={props.id} text={props.labelText} />
                <div id={props.id} className="form-select-component">
                    <div
                        onClick={this.toggleShowHide}
                        className="selected-value"
                        tabIndex="-1"
                        onBlur={this.handleBlur}
                    >
                        {selectedValue}
                    </div>
                        <ul style={this.state.show === false ? {display: 'none'} : {display: 'block'}} >
                            { options }
                        </ul>
                </div>
                <ValidationError error={props.error} />
            </div>
        );
    }
}
