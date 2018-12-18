import React from "react";
import axios from "axios";
import Movie from './Movie';

class Search extends React.Component {
    constructor(props) {
        super(props);
        
        this.state = {
            query: "",
            movies: [],
        }
    }

    onQueryChange = (event) => {
        this.setState({
            query: event.target.value,
        })
    }

    onFormSubmit = (event) => {
        event.preventDefault();

        const query = this.state.query;
        const url = `http://localhost:3000/movies?query=${query}`;

        axios.get(url)
            .then((response) => {
                console.log(response.data);
                this.setState({
                    movies: response.data,
                })
            })
            .catch((error) => {
                console.log(error.message);
            })

        this.setState({
            query: '',
        });

        
    }


    render() {
        const allMovies = this.state.movies.map((movie) => {
            return <Movie key={movie.external_id}
                {...movie}/>
        });
        console.log(this.props.match.path);
        return (
            <div>
                <h2>Search</h2>
                <form onSubmit={this.onFormSubmit}>
                    <input name="search" id="search" placeholder="Search" value={this.state.query} onChange={this.onQueryChange} />
                    <input type="submit" value="Go" />
                </form>
                { allMovies }
            </div>
        )
    }
}
  


export default Search;
