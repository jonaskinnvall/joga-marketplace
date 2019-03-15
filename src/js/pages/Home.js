import React from "react";

class Home extends React.Component {
    state = { response: "", post: "", responseToPost: "" };

    componentDidMount() {
        this.callAPI()
            .then(res => this.setState({ response: res.express }))
            .catch(err => console.log(err));
    }

    callAPI = async () => {
        const response = await fetch("/api/hello");
        const body = await response.json();

        if (response.status !== 200) throw Error(body.message);

        return body;
    };

    render() {
        console.log("Home");
        return (
            <div>
                <h1>Home Page</h1>
                <p>{this.state.response}</p>
            </div>
        );
    }
}

export default Home;
