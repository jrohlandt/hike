import React from 'react';
import style from './style.scss';
import { browserHistory } from 'react-router';

import Alert from '../alert';
import BreadCrumbs from '../breadcrumbs';
import CoordinatesMap from '../maps/CoordinatesMap';

export default class TrailShow extends React.Component {
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
        };
    }

    componentDidMount() {
        $.ajax({
           url: `/admin/trails/${this.state.id}`,
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
                <Alert
                    message={this.state.message}
                    class={this.state.class}
                />
            <BreadCrumbs heading={`Trail Preview - ${this.state.name}`}/>

                <div>
                    <h1>{this.state.name}</h1>
                    <CoordinatesMap
                        lat={this.state.latitude_start}
                        lng={this.state.longitude_start}
                        allowAddMarker={false}
                    />
                </div>
            </div>
        );
    }
}
