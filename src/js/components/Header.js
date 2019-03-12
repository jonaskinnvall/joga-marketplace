import React from "react";
import {Link} from "react-router-dom";
import PropTypes from "prop-types";

import Title from "./header/Title";
// import Search from "./header/Search"


class Header extends React.Component {
	handleChange(e){
		const title = e.target.value; 
		this.props.changeTitle(title);
    }
    
//       constructor() {
//     super()
//     this.state = {
//       collapsed: true,
//     };
//   }

//   toggleCollapse() {
//     const collapsed = !this.state.collapsed;
//     this.setState({collapsed});
//   }

	render() {
        
        let collapsed = true;
        // const {location} = this.props;
        //let {collapsed} = this.state;
        // const featuredClass = location.pathname === "/" ? "active" : "";
        // const categoriesClass = location.pathname.match(/^\/archives/) ? "active" : "";
        // const searchClass = location.pathname.match(/^\/settings/) ? "active" : "";
        const navClass = collapsed ? "collapse" : "";
    	
        return(
            // <div>
            //     <nav className = "navbar navbar-expand-sm bg-dark navbar-dark">   
            //         <ul className = "navbar-nav">
            //             <li className = "nav-item"> <Link to="/">Home</Link> </li>
            //             <li className = "nav-item"> <Link to="/featured">Featured</Link> </li>
            //             <li className = "nav-item"> <Link to="/cats">Categories</Link> </li>
            //             <li className = "nav-item"> <Link to="/login">Login</Link> </li>
            //             <li className = "nav-item"> <Link to="/signup">Sign Up</Link> </li>
            //         </ul>
            //         <input value={this.props.title} onChange={this.handleChange.bind(this)}/>
            //         <Title title={this.props.title} />
            //         <button>{this.props.title}</button>
            //     </nav>   
            // </div>
            <div>
                <nav className = "navbar navbar-expand-sm bg-dark navbar-dark">   
                    <div className="container">
                        <div className="navbar-header">
                            <button type="button" className="navbar-toggle" value={this.props.collapsed} onClick={this.toggleCollapse.bind(this)} >
                            <span className="sr-only">Toggle navigation</span>
                            <span className="icon-bar"></span>
                            <span className="icon-bar"></span>
                            <span className="icon-bar"></span>
                            </button>
                        </div>
                        <div className={"navbar-collapse " + navClass} id="bs-example-navbar-collapse-1">
                            <ul className = "nav navbar-nav">
                                <li className = "nav-item"> <Link to="/">Home</Link> </li>
                                <li className = "nav-item"> <Link to="/featured">Featured</Link> </li>
                                <li className = "nav-item"> <Link to="/cats">Categories</Link> </li>
                                <li className = "nav-item"> <Link to="/login">Login</Link> </li>
                                <li className = "nav-item"> <Link to="/signup">Sign Up</Link> </li>
                            </ul>
                            <Title title={this.props.title}/>
                            <input value={this.props.title} onChange={this.handleChange.bind(this)}/>
                        </div>
                    </div>
                </nav>   
            </div>
        );
    }
}

Header.propTypes = {
    changeTitle: PropTypes.func,
    title: PropTypes.string,
    location: PropTypes.any,
    collapsed: PropTypes.bool
};

export default Header;