import React from 'react';
import style from './style.scss';

import ListingPage from '../listing/Page';

export default class TrailsListing extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        var props = {
            itemType: 'trail',
            columnsToDisplay: ['name', 'created_at'],
            baseUrl: this.props.location.pathname
        }
        
        return (
            <ListingPage {...props} />
        );
    }
}
