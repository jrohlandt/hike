import React from 'react';
import style from './style.scss';

import BreadCrumbs from '../breadcrumbs';

export default class TrailCreate extends React.Component {
    render() {
        return (
            <div>
                <BreadCrumbs />
                <p>trail create</p>
            </div>
        );
    }
}
