import React from "react"
import {Switch, Route} from "react-router-dom"

import Featured from "../pages/Featured"
import Categories from "../pages/Categories"
import SignIn from "../pages/SignIn"


export default class Main extends React.Component{

    render(){
        return(
            <Switch>
                <Route exact path = "/" component = {Featured}/>
                <Route path = "/feat" component = {Featured}/>
                <Route path = "/cat" component = {Categories}/>
                <Route path = "/sign" component = {SignIn}/>
            </Switch>
        )
    }
}