import React from "react";
//import {connect} from "react-redux";

class Featured extends React.Component {
    state = {
        response: "",
        post: "",
        responseToPost: ""
    };

    handleSubmit = async e => {
        e.preventDefault();
        const response = await fetch("/api/world", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ post: this.state.post })
        });
        const body = await response.text();
        this.setState({ responseToPost: body });
    };

    render() {
        console.log("feat");
        return (
            <div>
                <h1>Featured Page</h1>
                <h3>Lista</h3>
                {/* <button onClick={() => this.handleClick()}>Press Me</button> */}
                <form onSubmit={this.handleSubmit}>
                    <p>
                        <strong>Post to server:</strong>
                    </p>
                    <input
                        type="text"
                        value={this.state.post}
                        onChange={e => this.setState({ post: e.target.value })}
                    />
                    <button type="submit">Submit</button>
                </form>
                <p>{this.state.responseToPost}</p>
            </div>
        );
    }
}

export default Featured;
