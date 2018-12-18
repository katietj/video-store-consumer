import React from "react";
import axios from 'axios';
import Movie from './Movie';
import PropTypes from 'prop-types';

class Library extends React.Component {
  constructor(props) {
      super(props);

      this.state = {
          movies: [],
          errorMessage: ""
      }
  }

  componentDidMount(){
    const URL = "http://localhost:3000/movies"
      axios.get(URL)
      .then((response) => {
        const movies = response.data.map((info) => {
          return <Movie key={info.external_id} path="/library" {...info} getMovie={this.props.getMovie}/>
        })
        this.setState({
          movies,
        })
      })
      .catch((error) =>{

        this.setState({
          errorMessage: error.message,
      })
    })
  }

  render() {

      return (
          <div>
              <h2>Library</h2>
              {this.state.errorMessage && <h3>{this.state.errorMessage}</h3>}
              { this.state.movies }

          </div>
      )
  }
}

Library.propTypes = {
  getMovie: PropTypes.func.isRequired,
};

export default Library;
