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
            latitude_start: '',
            longitude_start: '',
            severities: [],
            exposures: [],
            validationErrors: {}
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSelect = this.handleSelect.bind(this);
        this.handleCoordinates = this.handleCoordinates.bind(this);
        this.handleDestroy = this.handleDestroy.bind(this);
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
           url: '/admin/trails/' + this.state.id,
           type: "PATCH",
           dataType: 'json',
           data: this.state,
           cache: false,
           success: function(res) {
               if (res.response_status.code === 200) {
                   localStorage.setItem('flash-success', 'Trail has been saved.');
               } else if (res.response_status.code === 404 ){
                   localStorage.setItem('flash-error', `Trail with id ${this.state.id} could not be found.`);
               } else {
                   localStorage.setItem('flash-error', `Trail could not be updated.`);
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
           }.bind(this)
       });
    }

    handleDestroy() {
        if (!window.confirm("Do you really want to delete " + this.state.name + "?")) {
            return false;
        }
        $.ajax({
           url: '/admin/trails/' + this.state.id,
           type: "DELETE",
           dataType: 'json',
           data: this.state,
           cache: false,
           success: function(res) {
               if (res.response_status.code === 200) {
                   localStorage.setItem('flash-success', `Trail ${this.state.name} has been deleted.`);
               } else if (res.response_status.code === 404 ){
                   localStorage.setItem('flash-error', `Trail with id ${this.state.id} could not be found.`);
               } else {
                   localStorage.setItem('flash-error', `Trail could not be deleted.`);
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
           }.bind(this)
       });
    }

    componentDidMount() {
        window.scrollTo(0, 0);
        $.ajax({
           url: '/admin/trails/' + this.state.id,
           type: "GET",
           dataType: 'json',
           cache: false,
           success: function(res) {
              this.setState({
                name: res.items.name,
                distance: res.items.distance,
                severity_id: res.items.severity_id,
                exposure_id: res.items.exposure_id,
                elevation_min: res.items.elevation_min,
                elevation_max: res.items.elevation_max,
                description: res.items.description,
                latitude_start: res.items.latitude_start,
                longitude_start: res.items.longitude_start,
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
                <BreadCrumbs heading={`Edit Trail - ${this.state.name}`}/>
                <Alert
                    message={this.state.message}
                    class={this.state.class}
                />

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
                        <div
                            className="form-delete-button"
                            onClick={this.handleDestroy}
                            >
                            Delete
                        </div>
                    </div>

                    <div style={{clear: 'both'}}></div>
                </div>
            </div>
        );
    }
}
