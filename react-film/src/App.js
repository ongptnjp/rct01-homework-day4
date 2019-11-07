import React, { Component } from 'react';
import TMDB from './TMDB';
import FilmListing from './components/FilmListing';
import FilmDetails from './components/FilmDetails';
import './App.css';

const { films, api_key } = TMDB;

class App extends Component {

  state = {
    films: films,
    faves: [],
    current: {}
  }

  handleFaveToggle = film => {
    let faves = [...this.state.faves];
    const filmIndex = this.state.faves.indexOf(film);
    if (filmIndex !== -1) {
      console.log(`log out Removing ${film} to faves...`);
      faves.splice(filmIndex, 1);
    } else {
      console.log(`log out Adding ${film} to faves...`);
      faves = [...faves, film];
    }

    this.setState({ faves });
  }

  handleDetailsClick = film => {
    console.log(`Fetching details for ${film.title}`);

    const url = `https://api.themoviedb.org/3/movie/${film.id}?api_key=${api_key}&append_to_response=videos,images&language=en`;
    fetch(url)
      .then(response => {
        return response.json();
      })
      .then(data => {
        console.log(data);
        this.setState({ current: data });
      });
  }

  render() {
    return (
      <div className="film-library">
        <FilmListing 
          films={this.state.films}
          faves={this.state.faves}
          handleFaveToggle={this.handleFaveToggle}
          handleDetailsClick={this.handleDetailsClick}
        />
        <FilmDetails film={this.state.current} />
      </div>
    );
  }
}

export default App;
