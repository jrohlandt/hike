import React from 'react';
import style from './style.scss';
import { browserHistory } from 'react-router';

import Alert from '../alert';
import BreadCrumbs from '../breadcrumbs';
import TrailForm from './form.js';

export default class TrailCreate extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            distance: '',
            severity_id: '',
            exposure_id: '',
            elevation_min: '',
            elevation_max: '',
            description: '',
            latitude_start: '',
            longitude_start: '',
            severities: [],
            exposures: [],
            validationErrors: {}
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSelect = this.handleSelect.bind(this);
        this.handleCoordinates = this.handleCoordinates.bind(this);
        this.submitForm = this.submitForm.bind(this);
        this.clearValidationError = this.clearValidationError.bind(this);
    }

    handleChange(event) {
        var inputName = event.target.name;
        var inputValue = event.target.value;
        if (this.state.hasOwnProperty(inputName)) {
            var state = {};
            state[inputName] = inputValue;
            this.setState(state);
            this.clearValidationError(inputName);
        }
    }

    handleSelect(inputName, inputValue) {
        if (this.state.hasOwnProperty(inputName)) {
            var state = {};
            state[inputName] = inputValue;
            this.setState(state);
            this.clearValidationError(inputName);
        }
    }

    handleCoordinates(latitude, longitude) {
        this.setState({latitude_start: latitude, longitude_start: longitude});
    }

    clearValidationError(inputName) {
        var validationErrors = this.state.validationErrors;
        if (validationErrors.hasOwnProperty(inputName)) {
            delete validationErrors[inputName];
            this.setState({validationErrors});
        }
    }

    submitForm() {
        $.ajax({
            url: '/admin/trails',
            type: "POST",
            dataType: 'json',
            data: this.state,
            cache: false,
            success: function(res) {
                if (res.response_status.code === 200) {
                    localStorage.setItem('flash-success', 'Trail has been created.');
                } else {
                    localStorage.setItem('flash-error', `Trail could not be created.`);
                }
                browserHistory.push('/admin/trails');
            }.bind(this),
            error: function(xhr, status, err) {
                var errors = $.parseJSON(xhr.responseText);
                var validationErrors = {};
                for (var key in errors) {
                    if (errors.hasOwnProperty(key)) {
                        validationErrors[key] = errors[key][0];
                    }
                }
                this.setState({validationErrors});
                window.scrollTo(0, 0);
            }.bind(this)
        });
    }

    componentDidMount() {
        window.scrollTo(0, 0);
        $.ajax({
           url: '/admin/trails/create',
           type: "GET",
           dataType: 'json',
           cache: false,
           success: function(res) {
               console.log(res);
              this.setState({
                severities: res.severities,
                exposures: res.exposures
              });
           }.bind(this),
           error: function(xhr, status, err) {
               console.log(xhr);
           }.bind(this)
       });
    }

    render() {
        var errors = this.state.validationErrors;
        return (
            <div>
                <Alert />
                <BreadCrumbs heading="Create Trail"/>
                <TrailForm
                    {...this.state}
                    handleChange={this.handleChange}
                    handleSelect={this.handleSelect}
                    handleCoordinates={this.handleCoordinates}
                    submitForm={this.submitForm}
                />
                <div className="form-row form-bottom-buttons">
                    <div className="form-buttons">
                        <div
                            className="submit-button"
                            onClick={this.submitForm}
                            >
                            Submit
                        </div>
                    </div>
                    <div style={{clear: 'both'}}></div>
                </div>
            </div>
        );
    }
}
