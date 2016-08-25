import React from 'react';
import style from './style.scss';
import { browserHistory } from 'react-router';

import Alert from '../alert';
import BreadCrumbs from '../breadcrumbs';
import TrailForm from './form.js';

export default class TrailEdit extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            id: props.params.id,
            name: '',
            distance: '',
            severity_id: '',
            exposure_id: '',
            elevation_min: '',
            elevation_max: '',
            description: '',
            severities: [],
            exposures: [],
            _method: 'PATCH',
            validationErrors: {}
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSelect = this.handleSelect.bind(this);
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

    clearValidationError(inputName) {
        var validationErrors = this.state.validationErrors;
        if (validationErrors.hasOwnProperty(inputName)) {
            delete validationErrors[inputName];
            this.setState({validationErrors});
        }
    }

    submitForm() {
        $.ajax({
           url: '/admin/trails/' + this.state.id,
           type: "POST",
           dataType: 'json',
           data: this.state,
           cache: false,
           success: function(res) {
               localStorage.setItem('flash-success', 'Trail has been saved.');
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
           }.bind(this)
       });
    }

    componentDidMount() {
        $.ajax({
           url: '/admin/trails/' + this.state.id,
           type: "GET",
           dataType: 'json',
           cache: false,
           success: function(res) {
               console.log(res);
              this.setState({
                name: res.items.name,
                distance: res.items.distance,
                severity_id: res.items.severity_id,
                exposure_id: res.items.exposure_id,
                elevation_min: res.items.elevation_min,
                elevation_max: res.items.elevation_max,
                description: res.items.description,
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
                <Alert
                    message={this.state.message}
                    class={this.state.class}
                />
                <BreadCrumbs />

                <TrailForm
                    {...this.state}
                    handleChange={this.handleChange}
                    handleSelect={this.handleSelect}
                    submitForm={this.submitForm}
                />
            </div>
        );
    }
}
