import React from 'react';
import style from './style.scss';

export default class Alert extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            message: '',
            class: 'alert-none'
        }
    }

    componentDidMount() {
        if (this.storageAvailable('localStorage')) {
            var alertTypes = ['flash-success', 'flash-error'];
            var alerts = alertTypes.map((alertType) => {
                console.log(alertType);
                var alertMessage = localStorage.getItem(alertType);
                console.log(alertMessage);

                if (alertMessage) {
                    localStorage.removeItem(alertType);
                    return {message: alertMessage, class: alertType};
                }
            });
            console.log(alerts);
            if (typeof alerts[0] != 'undefined') {
                this.setState(alerts[0]);
            }
        }
    }


    storageAvailable(type) {
        try {
            var storage = window[type],
                x = '__storage_test__';
            storage.setItem(x, x);
            storage.removeItem(x);
            return true;
        }
        catch(e) {
            return false;
        }
    }

    render() {
        return (
            <div className={'alert ' + this.state.class}>
                {this.state.message}
            </div>
        );
    }
}
