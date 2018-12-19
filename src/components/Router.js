import React from 'react';
import { BrowserRouter, Route, Switch, Link } from 'react-router-dom';
import App from '../App';
import Customers from './Customers';
import Customer from './Customer';
import Library from './Library';
import Search from './Search';
import NotFound from './NotFound';
import axios from 'axios';
import "./Router.css";

class Router extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      movieId: null,
      customerId: null,
      currentMovieTitle: "",
      currentCustomerName: "",
      msg: "",
      customers: []
    };
  }

  getCustomerList = () => {
    const URL = "http://localhost:3000/customers"
    axios.get(URL)
      .then((response) => {
        const customers = response.data.map((info) => {
          return <Customer key={info.id} {...info} getCustomer={this.getCustomer} />
        })
        this.setState({
          customers,
        })
      })
      .catch((error) => {

        this.setState({
          msg: error.message,
        })
      })
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
                  // let customerList = [...this.state.customers];
   
                  // let customer = this.state.customers.find((person) => person.props.id === this.state.customerId);
            

                  this.setState({
                      msg: "Successfully added rental",
                      movieId: null,
                      customerId: null,
                      currentMovieTitle: "",
                      currentCustomerName: "",
                  })
              })
              .catch((error) => {
                  this.setState({
                      msg: error.message
                  })
              })
      }

    }



  render() {
    return <BrowserRouter>
        <div>
          <nav className="flex-nav">
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
              <li className="text">
                <p>Selected Movie:</p>
                {this.state.currentMovieTitle && <span>
                    {this.state.currentMovieTitle}
                  </span>}
              </li>
              <li className="text">
                <p>Selected Customer:</p>
                {this.state.currentCustomerName && <span>
                    {this.state.currentCustomerName}
                  </span>}
              </li>
              <li className="text">
                <button onClick={this.rentMovie}>Check Out</button>
              </li>
            </ul>
          </nav>
          <div>
            {this.state.msg && <h3>{this.state.msg}</h3>}
          </div>
          <Switch>
            <Route exact path="/" component={App} />
            <Route path="/search" component={Search} />
            <Route path="/library" render={() => <Library getMovie={this.getMovie} />} />
            <Route path="/customers" render={() => <Customers getCustomerList={this.getCustomerList} customers={this.state.customers}/>} />
            <Route component={NotFound} />
          </Switch>
        </div>
      </BrowserRouter>;
  }
}


export default Router;
