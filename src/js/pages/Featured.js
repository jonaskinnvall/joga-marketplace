import React from "react";
//import {connect} from "react-redux";

class Featured extends React.Component {

  handleClick() { 
    console.log("Button pressed!");
  }

  render() {
    console.log("feat");
    return (
      <div>
        <h1>Featured Page</h1>
        <button onClick={() => this.handleClick()}>
            Press Me
        </button>
        <h3>Lista</h3>
      </div>
    );
  }
}

  export default Featured;