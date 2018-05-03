import React from "react"
import ReactDOM from "react-dom"

class layout extends React.Component {
    render() {
        return(
            <h1>Look at that!</h1>
        );
    }
}

const app = document.getElementById('app');

ReactDOM.render(<Layout/>, app)