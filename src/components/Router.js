import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import App from '../App';
import Customers from './Customers';
import Library from './Library';
import Search from './Search';

const Router = () => {
    return (
        <BrowserRouter>
            <Switch>
                <Route exact path="/" component={ App } />
                <Route path="/search" component={ Search } />
                <Route path="/library" component={ Library } />
                <Route path="/customers" component={ Customers } />
            </Switch>
        </BrowserRouter>
    )
}

export default Router;