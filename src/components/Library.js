import React from "react";
import axios from 'axios';
import Movie from './Movie'

class Library extends React.Component {
  constructor(props) {
      super(props);

      this.state = {
          movies: []
      }
  }

  componentDidMount(){
    const URL = "http://localhost:3000/movies"
      axios.get(URL)
      .then((response) => {
        const movies = response.data.map((info) => {
          console.log(info);
          return <Movie key={info.id} path={this.props.path} {...info}/>
        })
        this.setState({
          movies,
        })


      })
        .catch((error) =>{
          console.log(error.message);

          this.setState({
            errorMessage: error.message,
        })
      })
    }
    render() {
        console.log(this.props.path);

        return (
            <div>
                <h2>Library</h2>
                { this.state.movies }
            </div>
        )
    }
}


export default Library;
