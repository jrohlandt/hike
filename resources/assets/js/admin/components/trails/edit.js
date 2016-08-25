import React from 'react';
import style from './style.scss';
import { browserHistory } from 'react-router';

import Alert from '../alert';
import BreadCrumbs from '../breadcrumbs';
import FormInput from '../forms/Input';

export default class TrailEdit extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            id: props.params.id,
            name: '',
            distance: '',
            elevation_min: '',
            elevation_max: '',
            description: '',
            _method: 'PATCH',
            validationErrors: {},
        };

        this.handleChange = this.handleChange.bind(this);
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
                name: res.name,
                distance: res.distance,
                elevation_min: res.elevation_min,
                elevation_max: res.elevation_max,
                description: res.description
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

                <form>

                    <div className="form-row">
                        <FormInput
                            id="trail-name"
                            labelText="Nddame"
                            name="name"
                            value={this.state.name}
                            error={errors.name}
                            handleChange={this.handleChange}
                            />
                    </div>

                    <div className="form-row">
                        <FormInput
                            id="trail-distance"
                            labelText="Distance (meters)"
                            name="distance"
                            value={this.state.distance}
                            error={errors.distance}
                            handleChange={this.handleChange}
                        />
                        <FormInput
                            id="trail-elevation_min"
                            labelText="Min Elevation (meters)"
                            name="elevation_min"
                            value={this.state.elevation_min}
                            error={errors.elevation_min}
                            handleChange={this.handleChange}
                        />
                        <FormInput
                            id="trail-elevation_max"
                            labelText="Max Elevation (meters)"
                            name="elevation_max"
                            value={this.state.elevation_max}
                            error={errors.elevation_max}
                            handleChange={this.handleChange}
                        />
                    </div>

                    <div className="form-row">
                        <div className="input-group">
                            <label htmlFor="trail-description">Description </label>
                            <textarea
                                name="description"
                                id="trail-description"
                                value={this.state.description}
                                onChange={this.handleChange}
                            >
                            </textarea>
                            <div className="validation-error" >
                                { errors.description ? errors.description : '' }
                            </div>

                        </div>
                    </div>

                    <div className="input-row">
                        <div className="input-group">
                            <div
                                className="submit-button"
                                onClick={this.submitForm}
                            >
                                Submit
                            </div>
                        </div>
                    </div>

                </form>
            </div>
        );
    }
}
