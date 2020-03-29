import React from 'react';
import PropTypes from 'prop-types';

import Chevron from './Chevron';
import Star from './Star';
import StarFilled from './StarFIlled';

const SVG = props => {
    switch (props.name) {
        case 'chevron':
            return <Chevron {...props} />;
        case 'star':
            return <Star {...props} />;
        case 'starFilled':
            return <StarFilled {...props} />;
        default:
            return;
    }
};

export default SVG;

SVG.propTypes = {
    name: PropTypes.string.isRequired
};
