import React from 'react';

import FormInput from '../forms/Input';
import FormSelect from '../forms/Select';

export default class TrailForm extends React.Component {
    constructor(props) {
        super(props);

        // this.state = {
        //     show: false
        // }
    }

    // toggleShowHide() {
    //     console.log('open close');
    //     this.setState({show: !this.state.show});
    //
    // }

    componentDidMount() {

        var props = this.props;

        // Create callback to initialize Google Map
        window.initMap = function initMap() {
            var myLatLng = {lat: -33.9753693, lng: 18.4000676};
            var map = new google.maps.Map(document.getElementById('map'), {
              center: myLatLng,
              zoom: 12
            });

            google.maps.event.addListener(map, 'click', (event) => {
                var latlng = {lat: event.latLng.lat(), lng: event.latLng.lng()};
                
                props.handleCoordinates(event.latLng.lat());
                var marker = new google.maps.Marker({
                    position: latlng,
                    map: map,
                    title: 'Hello World!'
                });
            });
        }

        // Google map is initiliazed on page load by <script> in html body
        // but this is a SPA and when a user navigates away from the form page and then back to
        // the form again the map is not intitialized again automatically
        // so I initialize it manually here.
        if (typeof window.google === 'object') {
            window.initMap();
        }
    }

    render() {
        var props = this.props;
        var errors = props.validationErrors;

        return (
            <form>

                <div className="form-row">
                    <FormInput
                        id="trail-name"
                        labelText="Nddame"
                        name="name"
                        value={props.name}
                        error={errors.name}
                        handleChange={props.handleChange}
                    />
                </div>

                <div className="form-row">
                    <FormSelect
                        id="trail-severity"
                        labelText="Severity"
                        name="severity_id"
                        options={props.severities}
                        selected={props.severity_id}
                        error={errors.severity_id}
                        handleSelect={props.handleSelect}
                    />
                    <FormSelect
                        id="trail-exposure"
                        labelText="Exposure"
                        name="exposure_id"
                        options={props.exposures}
                        selected={props.exposure_id}
                        error={errors.exposure_id}
                        handleSelect={props.handleSelect}
                    />
                </div>

                <div className="form-row">
                    <FormInput
                        id="trail-distance"
                        labelText="Distance (meters)"
                        name="distance"
                        value={props.distance}
                        error={errors.distance}
                        handleChange={props.handleChange}
                    />
                    <FormInput
                        id="trail-elevation_min"
                        labelText="Min Elevation (meters)"
                        name="elevation_min"
                        value={props.elevation_min}
                        error={errors.elevation_min}
                        handleChange={props.handleChange}
                    />
                    <FormInput
                        id="trail-elevation_max"
                        labelText="Max Elevation (meters)"
                        name="elevation_max"
                        value={props.elevation_max}
                        error={errors.elevation_max}
                        handleChange={props.handleChange}
                    />
                </div>

                <div className="form-row">
                    <FormInput
                        id="trail-starting-coordinate"
                        labelText="Starting Coordinate"
                        name="coordinate_start"
                        value={props.coordinate_start}
                        error={errors.coordinate_start}
                        handleChange={props.handleChange}
                    />
                </div>

                <div className="form-row">
                    <div className="input-group">
                        <label htmlFor="trail-description">Description </label>
                        <textarea
                            name="description"
                            id="trail-description"
                            value={props.description}
                            onChange={props.handleChange}
                        >
                        </textarea>
                        <div className="validation-error" >
                            { errors.description ? errors.description : '' }
                        </div>

                    </div>
                </div>

                <div className="form-row">
                    <div id="map"></div>
                </div>

                <div className="input-row">
                    <div className="input-group">
                        <div
                            className="submit-button"
                            onClick={props.submitForm}
                        >
                            Submit
                        </div>
                    </div>
                </div>

            </form>
        );
    }
}
