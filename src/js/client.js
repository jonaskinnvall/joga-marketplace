import React from "react"
import ReactDOM from "react-dom"

class Layout extends React.Component {
    render() {
        return(
            <h1>FUNKA DIN JÄVLA IDIOT!</h1>
        );
    };
};

const app = document.getElementById('app');

ReactDOM.render(<Layout/>, app)