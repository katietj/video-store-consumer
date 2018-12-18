import React from 'react';
import { BrowserRouter, Route, Switch, Link } from 'react-router-dom';
import App from '../App';
import Customers from './Customers';
import Library from './Library';
import Search from './Search';
import NotFound from './NotFound';

const Router = () => {
    return <BrowserRouter>
        <div>
          <nav>
            <ul>
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/search">Search</Link>
              </li>
              <li>
                <Link to="/library">Library</Link>
              </li>
              <li>
                <Link to="/customers">Customers</Link>
              </li>
              <li>
                <button>Selected Movie</button>
              </li>
              <li>
                <button>Selected Customer</button>
              </li>
              <li>
                <button>Check Out</button>
              </li>
            </ul>
          </nav>
          <Switch>
            <Route exact path="/" component={App} />
            <Route path="/search" component={Search} />
            <Route path="/library" component={Library} />
            <Route path="/customers" component={Customers} />
            <Route component={NotFound} />
          </Switch>
        </div>
      </BrowserRouter>;
}

export default Router;