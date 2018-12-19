import React from "react";
import axios from "axios";
import Movie from './Movie';

class Search extends React.Component {
    constructor(props) {
        super(props);
        
        this.state = {
            query: '',
            movies: [],
            errorMessage: "",
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
                this.setState({
                    errorMessage: error.message
                })
            });
    }


    onQueryChange = (event) => {
        this.setState({
            query: event.target.value,
            errorMessage: "",
        }, () => this.showMovies());
    }

    render() {
        const allMovies = this.state.movies.map((movie) => {
            return <Movie key={movie.external_id}
                {...movie} path="/search"/>
        });

        return (
            <div>
                <h2>Search</h2>
                {this.state.errorMessage && <h3>{this.state.errorMessage}</h3>}
                <section>
                    <input name="search-bar" id="search" placeholder="Search" value={this.state.query} onChange={this.onQueryChange} />
                </section>
                { allMovies }
            </div>
        )
    }
}
  


export default Search;
