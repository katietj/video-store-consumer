import React from 'react';
import { BrowserRouter, Route, Switch, Link } from 'react-router-dom';
import App from '../App';
import Customers from './Customers';
import Library from './Library';
import Search from './Search';
import NotFound from './NotFound';
import axios from 'axios';

class Router extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      movieId: null,
      customerId: null,
      currentMovieTitle: "",
      currentCustomerName: "",
      msg: ""
    };
  }

  getMovie = (id, title) => {

    this.setState({
      currentMovieTitle: title,
      movieId: id
    })
  }

  getCustomer = (id,customer) => {
    this.setState({
      currentCustomerName: customer,
      customerId: id
    })
  }

  rentMovie = () => {
    if (this.state.movieId && this.state.customerId){
        let dueDate = new Date();
        dueDate.setDate(dueDate.getDate() + 7);
          const { currentMovieTitle, customerId, movieId} = this.state
          const url = `http://localhost:3000/rentals/${currentMovieTitle}/check-out`;

          const rental = {
              movie_id: movieId,
              customer_id: customerId,
              due_date: dueDate,
            }

          axios.post(url, rental)
              .then(()=> {
                console.log("Successfully added rental")
                  // this.setState({
                  //     msg: "Successfully added rental"
                  // })
              })
              .catch((error) => {
                console.log(`Could not add: ${error.message}`)
                  // this.setState({
                  //     msg: error.message
                  // })
              })
      }

    }



  render() {
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
                <p>Selected Movie:</p>
                {this.state.currentMovieTitle && <p>
                    {this.state.currentMovieTitle}
                  </p>}
              </li>
              <li>
                <p>Selected Customer:</p>
                {this.state.currentCustomerName && <p>
                    {this.state.currentCustomerName}
                  </p>}
              </li>
              <li>
                <button onClick={this.rentMovie}>Check Out</button>
              </li>
            </ul>
          </nav>
          <Switch>
            <Route exact path="/" component={App} />
            <Route path="/search" component={Search} />
            <Route path="/library" render={() => <Library getMovie={this.getMovie} />} />
            <Route path="/customers" render={() => <Customers getCustomer={this.getCustomer} />} />
            <Route component={NotFound} />
          </Switch>
        </div>
      </BrowserRouter>;
  }
}


export default Router;
