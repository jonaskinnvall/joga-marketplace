import React from 'react';
import PropTypes from 'prop-types';

import Chevron from './Chevron';
import Star from './Star';
import StarFilled from './StarFIlled';
import Gear from './Gear';
import Trash from './Trash';

const SVG = (props) => {
    switch (props.name) {
        case 'chevron':
            return <Chevron {...props} />;
        case 'star':
            return <Star {...props} />;
        case 'star-fill':
            return <StarFilled {...props} />;
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
