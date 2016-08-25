import React from 'react';
import style from './style.scss';

export default class FormInput extends React.Component {
    constructor(props) {
        super(props);
    }

    static propTypes = {
        error: React.PropTypes.string
    }

    render() {
        return (
            <div className="validation-error" >
                { this.props.error ? this.props.error : '' }
            </div>
        );
    }
}
