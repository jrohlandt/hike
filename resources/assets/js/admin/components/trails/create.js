import React from 'react';
import style from './style.scss';

import BreadCrumbs from '../breadcrumbs';

export default class TrailCreate extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            description: '',
            validationErrors: {}
        };
        this.handleChange = this.handleChange.bind(this);
        this.submitForm = this.submitForm.bind(this);
    }

    handleChange(event) {
        var inputName = event.target.name;
        var inputValue = event.target.value;
        if (this.state.hasOwnProperty(inputName)) {
            var state = {};
            state[inputName] = inputValue;
            this.setState(state);
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
               location.pathName = '/admin/trails';
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

    render() {
        var errors = this.state.validationErrors;
        return (
            <div>
                <BreadCrumbs />
                <form>
                    <div className="input-group">
                        <label htmlFor="trail-name">Name </label>
                        <input
                            name="name"
                            id="trail-name"
                            className="form-control"
                            value={this.state.name}
                            onChange={this.handleChange}
                        />
                        <div className="validation-error" >
                            { errors.name ? errors.name : '' }
                        </div>
                    </div>

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
                    <div className="input-group">
                        <div
                            className="submit-button"
                            onClick={this.submitForm}
                        >
                            Submit
                        </div>
                    </div>
                </form>
            </div>
        );
    }
}
