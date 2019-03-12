import React from "react";
import PropTypes from "prop-types";

import Header from "./components/Header";
import Main from "./components/Main";
import Footer from "./components/Footer";

class Layout extends React.Component {
	constructor(){
		super();
		this.state = {title: "Search"};
	}

	changeTitle(title){
		this.setState({title});
	}
	

	render() {
		const{location} = this.props;
		return(
        	<div>
            	<Header changeTitle={this.changeTitle.bind(this)} title={this.state.title} location = {location}/>

				<Main />
				<hr/>
                <Footer /> 
            </div>
        );
    }
}

Layout.propTypes = {
    location: PropTypes.any
};

export default Layout;
 