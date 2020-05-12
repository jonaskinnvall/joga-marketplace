import React from 'react';
import PropTypes from 'prop-types';

import Chevron from './Chevron';
import Star from './Star';
import Gear from './Gear';
import Trash from './Trash';

const SVG = (props) => {
    let icon = props.name.split('-')[0];

    switch (icon) {
        case 'chevron':
            return <Chevron {...props} />;
        case 'star':
            return <Star {...props} />;
        case 'gear':
            return <Gear {...props} />;
        case 'trash':
            return <Trash {...props} />;
        default:
            return;
    }
};

export default SVG;

SVG.propTypes = {
    name: PropTypes.string.isRequired,
};
