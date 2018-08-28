import React, { Component } from "react";
import Pagination from "./common/pagination";
import { getMovies } from "../services/fakeMovieService";
import { getGenres } from "../services/fakeGenreService";

import MoviesTable from "./moviesTable";

import ListGroup from "./common/listgroup";

import paginate from "../utils/paginate";

class Movies extends Component {
  state = {
    movies: [],
    genres: [],
    currentPage: 1,
    pageSize: 4,
    sortingOrder: {
      path: "title",
      order: "asc"
    }
  };

  componentDidMount() {
    const genres = [{ name: "All genres" }, ...getGenres()];
    this.setState({
      movies: getMovies(),
      genres
    });
  }
  handleDelete = movie => {
    const movies = this.state.movies.filter(m => m._id !== movie._id);
    this.setState({ movies });
  };

  handleLike = movie => {
    const movies = [...this.state.movies];
    const index = movies.indexOf(movie);
    movies[index] = { ...movies[index] };
    movies[index].liked = !movies[index].liked;
    this.setState({ movies });
  };

  handlePageChange = pageNumber => {
    this.setState({ currentPage: pageNumber });
  };

  handleGenreSelect = genre => {
    genre.name === "All genres"
      ? this.setState({ selectedGenre: undefined, currentPage: 1 })
      : this.setState({ selectedGenre: genre, currentPage: 1 });
  };

  handleSort = path => {
    this.setState({ path, order: "asc" });
  };

  render() {
    const { length: count } = this.state.movies;
    const { movies: _movies } = this.state;
    const { selectedGenre } = this.state;

    if (count === 0) return <p>There are no movies in the database.</p>;

    const filteredMovies = selectedGenre
      ? _movies.filter(movie => movie.genre.name === selectedGenre.name)
      : _movies;

    const sortedMovies = filteredMovies.sort((a, b) => {
      return a.name > b.name;
    });

    c;

    const movies = paginate(
      sortedMovies,
      this.state.currentPage,
      this.state.pageSize
    );
    return (
      <div className="row">
        <div className="col-3">
          <ListGroup
            genres={this.state.genres}
            onItemSelect={this.handleGenreSelect}
            selectedGenre={this.state.selectedGenre}
          />
        </div>
        <div className="col">
          <p>Showing {filteredMovies.length} movies in the database.</p>
          <MoviesTable
            movies={movies}
            onDelete={this.handleDelete}
            onLike={this.handleLike}
            onSort={this.handleSort}
          />
          <Pagination
            itemsCount={filteredMovies.length}
            pageSize={this.state.pageSize}
            onPageChange={this.handlePageChange}
            currentPage={this.state.currentPage}
          />
        </div>
      </div>
    );
  }
}

export default Movies;
