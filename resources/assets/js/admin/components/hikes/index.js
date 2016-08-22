import React from 'react';
import style from './style.scss';

import ListingPage from '../listing/page.js';

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
            baseUrl: this.props.location.pathname
        }
        return (
            <ListingPage {...props} />
        );
    }
}
