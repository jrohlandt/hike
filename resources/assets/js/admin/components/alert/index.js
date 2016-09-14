import React from 'react';
import style from './style.scss';
var ReactCSSTransitionGroup = require('react-addons-css-transition-group');

export default class Alert extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            message: '',
            class: 'alert-none',
            show: true
        }
        this.toggleShow = this.toggleShow.bind(this);
    }

    toggleShow() {
        this.setState({show: !this.state.show});
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
            } else {
                this.setState({show: false});
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
        var show = this.state.show ? '' : 'alert-hide';
        return (
            <div className={'alert ' + show}>
                <div
                    className={'alert ' + this.state.class}
                    >
                    <div>{this.state.message}</div>
                    <div className="alert-close" onClick={this.toggleShow}>x</div>
                </div>
            </div>
        );
    }
}
