import React from 'react';
import {BrowserRouter as Router,
    Switch,
    Route,
    Link} from "react-router-dom";
import LogUp from "../pages/logUp";
import LogIn from "../pages/logIn";

const RouterComp = () => {
    return (
        <Router>
            <Switch>
                <Route exact path="/" component='LogUp' />
                <Route exact path="/login" component='LogIn' />
            </Switch>
        </Router>
    );
};

export default RouterComp;