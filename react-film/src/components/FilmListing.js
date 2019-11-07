import React, { Component } from 'react';
import FilmRow from './FilmRow';

class FilmListing extends Component {
  state = {
    filter: 'all',
    allfilms: {},
    favesFilms: {}
  }

  handleFilterClick = filter => {
    console.log(`Setting filter to ${filter}`);
    this.setState({ filter })
  }

  render() {
    const allFilms = this.props.films.map(film => 
      <FilmRow 
        key={film.id}
        film={film}
        onFaveToggle={
          () => this.props.handleFaveToggle(film)
        }
        isFave={this.props.faves.includes(film)}
        handleDetailsClick={this.props.handleDetailsClick}
      />);
    const favesFilms = this.props.faves.map(fave =>
      <FilmRow 
        key={fave.id}
        film={fave}
        onFaveToggle={
          () => this.props.handleFaveToggle(fave)
        }
        isFave={this.props.faves.includes(fave)}
        handleDetailsClick={this.props.handleDetailsClick}
      />);
    return (
      <div className="film-list">
        <h1 className="section-title">FILMS</h1>
        <div className="film-list-filters">
          <div className={"film-list-filter " + (this.state.filter === "all" ? "is-active" : "")}
            onClick={() => this.handleFilterClick('all')}>
            ALL
      <span className="section-count">{this.props.films.length}</span>
          </div>
          <div className={"film-list-filter " + (this.state.filter === "faves" ? "is-active" : "")}
            onClick={() => this.handleFilterClick('faves')}>
            FAVES
      <span className="section-count">{this.props.faves.length}</span>
          </div>
        </div>

        {this.state.filter === "all" ? allFilms : favesFilms}
      </div>
    )
  }
}

export default FilmListing;