import React, { Component } from "react";
import { Switch, Route } from "react-router-dom";
import { Redirect } from 'react-router-dom'

import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage"
import NotFoundPage from './pages/NotFoundPage'

class Roteamento extends Component {
    render() {
        return (
            <Switch>
                <PrivateRoute path="/" component={HomePage} exact />
                <Route path="/login" component={LoginPage} />
                <Route component={NotFoundPage}/>
            </Switch>
        )
    }
}

class PrivateRoute extends Component {

    estaAutenticado = () => {
        if (localStorage.getItem('TOKEN')) {
            return true
        } else {
            return false
        }
    }

    render(){
        const { component: Component,  ...props} = this.props;
        if(this.estaAutenticado()){
            return <Component {...props} />
        } else {
            return <Redirect to="/login" />
        }
    }
}
export default Roteamento;
