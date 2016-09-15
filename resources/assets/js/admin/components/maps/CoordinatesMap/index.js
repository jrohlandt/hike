import React from 'react';
import style from './style.scss';
import { Type } from '../../../../modules/types.js';

export default class CoordinatesMap extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            center: {lat: -33.9753693, lng: 18.4000676},
            marker: false
        }
    }

    addMarker(map, options) {
        var marker = new google.maps.Marker({
            position: options.latLng,
            map: map,
            title: 'Hello World!'
        });

        if (this.state.marker !== false) {
            this.state.marker.setMap(null);
        }

        this.setState({marker: marker});
        marker.setMap(map);
    }
    componentDidMount() {

        // Create callback to initialize Google Map
        var initMap = function initMap() {
            var map = new google.maps.Map(document.getElementById('coordinates-map'), {
              center: this.state.center,
              zoom: 13
            });


            // TODO research lifecycle methods to see if I can avoid setTimeout
            setTimeout(() => {
                if (Type.isNumberNoZero(this.props.lat) && Type.isNumberNoZero(this.props.lng)) {
                    var options = {
                        latLng: {lat: parseFloat(this.props.lat), lng: parseFloat(this.props.lng)}
                    }
                    this.addMarker(map, options);
                    map.setCenter(options.latLng);
                }

            }, 300);


            if (this.props.allowAddMarker !== false) {
                map.addListener('click', (e) => {
                    var options = {
                        latLng: {lat: e.latLng.lat(), lng: e.latLng.lng()}
                    };

                    this.props.handleChange(e.latLng.lat(), e.latLng.lng());

                    this.addMarker(map, options);
                });
            }
        }

        // Google map is initiliazed on page load by <script> in html body
        // but this is a SPA and when a user navigates away from the form page and then back to
        // the form again the map is not intitialized again automatically
        // so I initialize it manually here.
        // $(document).ready(() => {
            if (typeof window.google === 'object') {
                initMap.call(this);
            }
        // });
    }

    render() {
        return (
            <div id="coordinates-map"></div>
        );
    }

}
