import React from 'react';
import style from './style.scss';

import ValidationError from '../ValidationError';
import Label from '../Label';

export default class FormInput extends React.Component {
    constructor(props) {
        super(props);

    }

    static propTypes = {
        name: React.PropTypes.string.isRequired
    }

    render() {
        return (
            <div className="input-group">
                <Label for={this.props.id} text={this.props.labelText} />
                <input
                    name={this.props.name}
                    id={this.props.id}
                    className="form-control"
                    value={this.props.value}
                    onChange={this.props.handleChange}
                />
                <ValidationError error={this.props.error} />
            </div>
        );
    }
}
