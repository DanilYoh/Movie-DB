import React from "react";
import Movie from "../movie";
import PropTypes from "prop-types";

import './movie-list.css';

export default class MovieList extends React.Component {

    render () {
        const {moviesList, handleRating} = this.props;
        if (moviesList.length !== 0) {
            const movies = moviesList.map((movie) => {
                const {id, ...movieProps} = movie;
                return (
                    <Movie
                        key={id}
                        id={id}
                        movieProps={movieProps}
                        handleRating={handleRating}
                    />
                )
            })
            return (
                <ul className='container'>
                    {movies}
                </ul>
            )

        } else {
            return (
                <ul className='container'>
                    <li className='no-movies'>
                        <span>
                            Фильмов нет но вы держитесь
                        </span>
                    </li>
                </ul>
            )
        }



    }
}

MovieList.defaultProps ={
    moviesList: [],
    handleRating: () => {}
}
MovieList.propTypes = {
    moviesList: PropTypes.arrayOf(Object),
    handleRating: PropTypes.func
}