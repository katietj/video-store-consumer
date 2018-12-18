import React from "react";
import axios from "axios";
import PropTypes from 'prop-types'

class Movie extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            msg: ""
        }
    }

    addToLibrary = () => {
        const url = `http://localhost:3000/movies`;
        const {title, external_id, image_url, release_date, overview} = this.props
        const movie = {
            title,
            external_id,
            image_url,
            release_date,
            overview
        }

        axios.post(url, movie)
            .then((response) => {
                this.setState({
                    msg: "Successfully added movie"
                })
            })
            .catch((error) => {
                this.setState({
                    msg: error.message
                })
            })
    }

    render() {
        const movie = this.props;
        return (
            <div>
                {movie.title}
                {movie.image}
                <button onClick={this.addToLibrary}>Add</button>
                {this.state.msg && <h3>{this.state.msg}</h3>}
            </div>
        )
    }
}

Movie.propTypes = {
  title: PropTypes.string,
  external_id: PropTypes.string,
  overview: PropTypes.string,
  release_date: PropTypes.string,
  image_url: PropTypes.string,
};

export default Movie;
