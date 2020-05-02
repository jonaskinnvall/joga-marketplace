import React from 'react';
import PropTypes from 'prop-types';

const Chevron = ({
    name = 'chevron-down',
    style = {},
    width = '2em',
    viewBox = '0 0 16 16',
    fill = 'currentColor',
}) =>
    name.includes('down') ? (
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
                d="M1.646 4.646a.5.5 0 01.708 0L8 10.293l5.646-5.647a.5.5 0 01.708.708l-6 6a.5.5 0 01-.708 0l-6-6a.5.5 0 010-.708z"
                clipRule="evenodd"
            />
        </svg>
    ) : (
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
                d="M7.646 4.646a.5.5 0 01.708 0l6 6a.5.5 0 01-.708.708L8 5.707l-5.646 5.647a.5.5 0 01-.708-.708l6-6z"
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
    fill: PropTypes.string,
};
