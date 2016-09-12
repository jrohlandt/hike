import React from 'react';
import style from './style.scss';

import ListingPage from '../listing/Page';

export default class HikesListing extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            columnsToDisplay: ['title', 'created_at'],
        };
    }

    render() {
        var props = {
            columnsToDisplay: this.state.columnsToDisplay,
            heading: 'Hikes',
            baseUrl: this.props.location.pathname
        }
        return (
            <ListingPage {...props} />
        );
    }
}
