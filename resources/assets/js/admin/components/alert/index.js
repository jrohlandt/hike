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
            var alerts = [];
            alertTypes.forEach((name) => {
                var alertMessage = localStorage.getItem(name);

                if (alertMessage) {
                    localStorage.removeItem(name);
                    alerts.push({message: alertMessage, class: name});
                }
            });

            // for now we only display one alert
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
