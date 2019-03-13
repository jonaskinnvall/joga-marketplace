import React from "react";
import PropTypes from "prop-types";

class Title extends React.Component {
    render() {
        return <h1>{this.props.title}</h1>;
    }
}

Title.propTypes = {
    title: PropTypes.any.isRequired
};

export default Title;
