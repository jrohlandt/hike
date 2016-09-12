import React from 'react';
import style from './style.scss';

import ValidationError from '../ValidationError';

export default class FormInput extends React.Component {
    constructor(props) {
        super(props);
    }

    static propTypes = {
        for: React.PropTypes.string.isRequired,
        text: React.PropTypes.string.isRequired
    }

    render() {
        return (
            <label
                htmlFor={this.props.for}
                className="form-label"
            >
                {this.props.text}
                <small>{this.props.smallText}</small>
            </label>
        );
    }
}
