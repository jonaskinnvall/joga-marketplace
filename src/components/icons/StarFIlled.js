import React from 'react';
import PropTypes from 'prop-types';

const StarFilled = ({
    name = 'star-fill',
    style = {},
    width = '1.5em',
    viewBox = '0 0 16 16',
    fill = 'currentColor'
}) => (
    <svg
        className={`bi bi-${name}`}
        width={width}
        height={width}
        viewBox={viewBox}
        fill={fill}
        xmlns="http://www.w3.org/2000/svg"
    >
        <path
            fillRule="evenodd"
            d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.283.95l-3.523 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"
            clipRule="evenodd"
        />
    </svg>
);

export default StarFilled;

StarFilled.propTypes = {
    name: PropTypes.string,
    style: PropTypes.object,
    width: PropTypes.string,
    viewBox: PropTypes.string,
    fill: PropTypes.string
};
