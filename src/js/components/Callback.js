import React, { Component } from "react";
// import { withRouter } from "react-router-dom";
import auth0Client from "../Auth/Auth";

import PropTypes from "prop-types";

class Callback extends Component {
    // async componentDidMount() {
    //     await auth0Client.handleAuthentication();
    //     // this.props.history.replace("/");
    // }

    render() {
        return <p>Loading profile...</p>;
    }
}

// Callback.propTypes = {
//     history: PropTypes.object
// };

// export default withRouter(Callback);
export default Callback;