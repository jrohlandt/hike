import React from 'react';
import style from './style.scss';

export default class CoordinatesMap extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {

        var props = this.props;

        // Create callback to initialize Google Map
        window.initMap = function initMap() {
            var myLatLng = {lat: -33.9753693, lng: 18.4000676};
            var map = new google.maps.Map(document.getElementById('coordinates-map'), {
              center: myLatLng,
              zoom: 12
            });

            google.maps.event.addListener(map, 'click', (event) => {
                var latlng = {lat: event.latLng.lat(), lng: event.latLng.lng()};

                props.handleChange(event.latLng.lat());
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
        return (
            <div id="coordinates-map"></div>
        );
    }

}
