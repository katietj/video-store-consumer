import React from "react";
import axios from 'axios';
import Customer from './Customer'
import PropTypes from 'prop-types';

class Customers extends React.Component {

  constructor(props){
    super(props);

    this.state = {
      customers: [],
      errorMessage: ""
    }
  }

  componentDidMount(){
    const URL = "http://localhost:3000/customers"
      axios.get(URL)
      .then((response) => {
        const customers = response.data.map((info) => {
          console.log(info);
          return <Customer key={info.id} {...info} getCustomer={this.props.getCustomer}/>
        })
        this.setState({
          customers,
        })
      })
      .catch((error) =>{

        this.setState({
          errorMessage: error.message,
      })
    })
  }
render (){

  return(
    <div>
      <h2>Customers</h2>
      {this.state.errorMessage && <h3>{this.state.errorMessage}</h3>}
      { this.state.customers}
    </div>
  )
}

}

Customers.propTypes = {
  getCustomer: PropTypes.func.isRequired,
}

export default Customers;
