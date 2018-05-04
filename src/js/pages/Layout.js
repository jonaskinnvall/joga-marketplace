import React from "react";

import Footer from "../components/layout/Footer"
import Header from "../components/layout/Header"

export default class Layout extends React.Component {

    render() {
        return(
        	<div>
            	<Header />
                <Footer /> 
            </div>
        );
    };
};
