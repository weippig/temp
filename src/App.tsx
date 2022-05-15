import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { Login }  from "./routes/Login";

import './App.css';

export const App = () => {
    return (
        <Switch>
            <Route path="/">
                <Login/>
            </Route>
        </Switch>
    )
};
