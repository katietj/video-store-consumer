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
            image_url: image_url.slice(31),
            release_date,
            overview
        }

        axios.post(url, movie)
            .then(()=> {
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

    selectMovie = () => {
        this.props.getMovie(this.props.id, this.props.title);
    }

    render() {
        const {title, image_url, path} = this.props;
        return (
            <div>
                {this.state.msg && <h3>{this.state.msg}</h3>}
                <img src={image_url} alt={title} />
                {path === '/search' ? <button onClick={this.addToLibrary}>Add to Library</button> : <button onClick={this.selectMovie}>Select Movie</button> }
            </div>
        )
    }
}

Movie.propTypes = {
  id: PropTypes.number,
  title: PropTypes.string.isRequired,
  external_id: PropTypes.number.isRequired,
  overview: PropTypes.string.isRequired,
  release_date: PropTypes.string,
  image_url: PropTypes.string.isRequired,
  getMovie: PropTypes.func,
  path: PropTypes.string.isRequired,
};

export default Movie;
