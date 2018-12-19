import React from "react";
import axios from "axios";
import Movie from './Movie';
import PropTypes from "prop-types";
import './Search.css';

class Search extends React.Component {
    constructor(props) {
        super(props);
        
        this.state = {
            query: '',
            movies: [],
        }
    }

    showMovies = () => {
        let url = `http://localhost:3000/movies`;
        const re = /^[A-Za-z0-9][A-Za-z0-9]*/i;
        
        if (this.state.query.trim().length !== 0 && this.state.query.match(re)) {
          url += `?query=${this.state.query}`;
        }

        axios
            .get(url)
            .then(response => {
                this.setState({ movies: response.data });
            })
            .catch(error => {
                // this.setState({
                //     errorMessage: error.message
                // })
                this.props.setMessages(error.message);
            });
    }


    onQueryChange = (event) => {
        this.setState({
            query: event.target.value,
            // errorMessage: "",
        }, () => this.showMovies());
    }

    render() {
        const allMovies = this.state.movies.map((movie) => {
            return <Movie key={movie.external_id}
                {...movie} path="/search" setMessages={this.props.setMessages}/>
        });

        return (
            <div className="search_container">
                <h2 className="search_title">Search</h2>
                {/* {this.state.errorMessage && <h3>{this.state.errorMessage}</h3>} */}
                <section className="search_bar">
                    <input name="search-bar" id="search" placeholder="Search" value={this.state.query} onChange={this.onQueryChange} />
                </section>
                <section className="movies_container">
                    {allMovies}
                </section>
            </div>
        )
    }
}
  
Search.propTypes = {
    setMessages: PropTypes.func.isRequired,
};

export default Search;
