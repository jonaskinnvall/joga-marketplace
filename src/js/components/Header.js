import React from "react";
import {Link} from "react-router-dom"


import Title from "./header/Title"
import Search from "./header/Search"



export default class Header extends React.Component {
		
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

        // const { location } = this.props;
        // const { collapsed } = this.state;
        // const featuredClass = location.pathname === "/" ? "active" : "";
        // const categoriesClass = location.pathname.match(/^\/archives/) ? "active" : "";
        // const searchClass = location.pathname.match(/^\/settings/) ? "active" : "";
        // const navClass = collapsed ? "collapse" : "";
    	
        return(

            <div>
            <nav className = "navbar navbar-expand-sm bg-dark navbar-dark">   
                <ul className = "navbar-nav">
                    <li className = "nav-item"> <Link to="/">Featured</Link> </li>
                    <li className = "nav-item"> <Link to="/cat">Categories</Link> </li>
                    <li className = "nav-item"> <Link to="/sign">SignIn</Link> </li>
                </ul>
                <Title title={this.props.title}/>
                <input value={this.props.title} onChange={this.handleChange.bind(this)}/>
            </nav>   
            </div>



            // <nav class = "navbar navbar-expand-sm bg-dark navbar-dark">   
            //     <div class="container">
            //         <div class="navbar-header">
            //             <button type="button" class="navbar-toggle" onClick={this.toggleCollapse.bind(this)} >
            //             <span class="sr-only">Toggle navigation</span>
            //             <span class="icon-bar"></span>
            //             <span class="icon-bar"></span>
            //             <span class="icon-bar"></span>
            //             </button>
            //         </div>
            //         <div class={"navbar-collapse " + navClass} id="bs-example-navbar-collapse-1">
            //             <ul class = "nav navbar-nav">
            //                 <li class = {featuredClass}> <Link to="/feat">Featured</Link> </li>
            //                 <li class = {categoriesClass}> <Link to="/cat">Categories</Link> </li>
            //                 <li class = {searchClass}> <Link to="/ser">Search</Link> </li>
            //             </ul>
            //             <Title title={this.props.title}/>
            //             <input value={this.props.title} onChange={this.handleChange.bind(this)}/>
            //         </div>
            //     </div>
            // </nav>   
        );
    };
};
