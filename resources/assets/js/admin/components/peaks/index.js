import React from 'react';
import style from './style.scss';

import ListingPage from '../listing/Page';

export default class PeaksListing extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        window.scrollTo(0, 0);
    }

    render() {
        var props = {
            itemType: 'peak',
            heading: 'Peaks',
            columnsToDisplay: ['name', 'elevation', 'created_at'],
            baseUrl: this.props.location.pathname
        }

        return (
            <ListingPage {...props} />
        );
    }
}
