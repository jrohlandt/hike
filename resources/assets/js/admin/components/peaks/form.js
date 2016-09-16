import React from 'react';

import FormInput from '../forms/Input';
import FormSelect from '../forms/Select';
import CoordinatesMap from '../maps/CoordinatesMap';

export default class PeakForm extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        var props = this.props;
        var errors = props.validationErrors;

        return (
            <div className="form-container">
                <form encType="multipart/form-data">
                    <div className="form-row">
                        <div className="form-row-heading">
                            <h4>Details</h4>
                        </div>
                        <FormInput
                            id="peak-name"
                            labelText="Name"
                            name="name"
                            value={props.name}
                            error={errors.name}
                            handleChange={props.handleChange}
                        />
                        <div style={{clear: 'both'}}></div>
                    </div>

                    <div className="form-row">
                        <div className="form-row-heading">
                                <h4>
                                    Coordinates
                                    <small> (click map below to get coordinates)</small>
                                </h4>
                        </div>
                        <FormInput
                            id="peak-latitude"
                            labelText="Latitude"
                            name="latitude"
                            value={props.latitude}
                            error={errors.latitude}
                            handleChange={props.handleChange}
                        />
                        <FormInput
                            id="peak-longitude"
                            labelText="Longitude"
                            name="longitude"
                            value={props.longitude}
                            error={errors.longitude}
                            handleChange={props.handleChange}
                        />
                        <div style={{clear: 'both'}}></div>
                    </div>

                    <div className="form-row map">
                        <CoordinatesMap
                            lat={props.latitude}
                            lng={props.longitude}
                            handleChange={props.handleCoordinates} />
                    </div>

                    <div className="form-row">
                        <div className="form-row-heading">
                            <h4>Elevation and Exposure</h4>
                        </div>
                        <FormInput
                            id="peak-elevation"
                            labelText="Elevation"
                            smallText="(meters)"
                            name="elevation"
                            value={props.elevation}
                            error={errors.elevation}
                            handleChange={props.handleChange}
                        />
                        <FormSelect
                            id="peak-exposure"
                            labelText="Exposure"
                            name="exposure_id"
                            options={props.exposures}
                            selected={props.exposure_id}
                            error={errors.exposure_id}
                            handleSelect={props.handleSelect}
                        />
                        <div style={{clear: 'both'}}></div>
                    </div>

                    <div className="form-row">
                        <div className="input-group">
                            <label
                                htmlFor="peak-thumbnail"
                                className="form-label"
                            >
                                Thumbnail
                            </label>
                            <img src={props.thumbnail ? props.thumbnailPath + props.thumbnail : props.thumbnailPath + 'no-image.png'} />
                            <input onChange={props.uploadThumbnail} type="file" name="thumbnail" id="peak-thumbnail" />
                            <div className="validation-error" >
                                { errors.thumbnail ? errors.thumbnail : '' }
                            </div>
                        </div>
                        <div style={{clear: 'both'}}></div>
                    </div>

                    <div className="form-row">
                        <div className="input-group" style={{width: '100%'}}>
                            <label
                                htmlFor="peak-description"
                                className="form-label"
                            >
                                Description
                            </label>
                            <textarea
                                name="description"
                                id="peak-description"
                                value={props.description}
                                onChange={props.handleChange}
                                className="form-control"
                            >
                            </textarea>
                            <div className="validation-error" >
                                { errors.description ? errors.description : '' }
                            </div>
                        </div>
                        <div style={{clear: 'both'}}></div>
                    </div>



                </form>
            </div>
        );
    }
}
