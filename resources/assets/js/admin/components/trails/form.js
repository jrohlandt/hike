import React from 'react';

import FormInput from '../forms/Input';
import FormSelect from '../forms/Select';
import CoordinatesMap from '../maps/CoordinatesMap';

export default class TrailForm extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        var props = this.props;
        var errors = props.validationErrors;

        // var startingCoordinates = {};
        // if (props.latitude_start && props.longitude_start) {
        //     startingCoordinates = {
        //         lat: ,
        //         lng: props.longitude_start
        //     }
        // }

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
                        id="trail-latitude-start"
                        labelText="Latitude"
                        name="latitude_start"
                        value={props.latitude_start}
                        error={errors.latitude_start}
                        handleChange={props.handleChange}
                    />
                    <FormInput
                        id="trail-longitude-start"
                        labelText="Longitude"
                        name="longitude_start"
                        value={props.longitude_start}
                        error={errors.longitude_start}
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
                    <CoordinatesMap
                        lat={props.latitude_start}
                        lng={props.longitude_start}
                        handleChange={props.handleCoordinates} />
                </div>

                <div className="form-row">
                    <div className="input-group">
                        <div className="input-group">
                            <div
                                className="submit-button"
                                onClick={props.submitForm}
                                >
                                Submit
                            </div>
                        </div>
                    </div>
                </div>

            </form>
        );
    }
}
