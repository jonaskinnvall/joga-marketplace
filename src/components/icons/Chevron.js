import React from 'react';
import PropTypes from 'prop-types';

const Chevron = ({
    name = 'chevron-right',
    style = {},
    width = '1em',
    viewBox = '0 0 20 20',
    fill = 'currentColor'
}) => (
    <svg
        className={`bi bi-${name}`}
        width={width}
        height={width}
        viewBox={viewBox}
        fill="currentColor"
        xmlns="http://www.w3.org/2000/svg"
    >
        <path
            fillRule="evenodd"
            d="M6.646 3.646a.5.5 0 01.708 0l6 6a.5.5 0 010 .708l-6 6a.5.5 0 01-.708-.708L12.293 10 6.646 4.354a.5.5 0 010-.708z"
            clipRule="evenodd"
        />
    </svg>
);
export default Chevron;

Chevron.propTypes = {
    name: PropTypes.string,
    style: PropTypes.object,
    width: PropTypes.string,
    viewBox: PropTypes.string,
    fill: PropTypes.string
};
