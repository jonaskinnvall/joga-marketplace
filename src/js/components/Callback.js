import React, {Component} from 'react';

class Callback extends Component {
    render() {
        console.log(this.props);
        return <p>Loading profile...</p>;
    }
}

export default Callback;
