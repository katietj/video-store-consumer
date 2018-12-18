import React from 'react';

import PropTypes from 'prop-types'

const Customer = (props) => {
const { id, name, movies_checked_out_count} = props;

const onClicked = () => {
  props.getCustomer(id, name);
}

return(
  <div>
    <p> {name}</p>
    <p> {movies_checked_out_count}</p>
    <button onClick={onClicked}>Select Customer</button>
  </div>
)
}

Customer.propTypes = {
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  movies_checked_out_count: PropTypes.number.isRequired,
  getCustomer: PropTypes.func.isRequired
}

export default Customer;
