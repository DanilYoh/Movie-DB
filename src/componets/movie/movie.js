import React from "react";
import PropTypes from 'prop-types';
import {GetGenresConsumer} from "../../services/tmdb-service-context";
import {Rate, Tag} from 'antd';
import {format} from "date-fns";

import './movie.css';


export default class Movie extends React.Component {
    _cutOverview(text, limit=170) {
        text = text.trim();
        if( text.length <= limit) return text;
        text = text.slice( 0, limit);
        let lastSpace = text.lastIndexOf(" ");
        if( lastSpace > 0) {
            text = text.substring(0, lastSpace);
        }
        return text + "...";
    }

    getGenre = (arr, num) => {
        const res = arr.filter(el => num.includes(el.id));
        const genres = res.map(elem => {
            const name = elem.name;
            return (
                <Tag key={name}>{name}</Tag>
            )
        } )
        return genres
    }

    setDate = (date) => {
        if (!(Boolean(date))) {
            return "No release date"
        }
        return format(new Date(date), 'MMMM dd, yyyy')
    }

    onRatingChange = (star) => {
        const card = {
            ...this.props.movieProps,
            personalRating: star,
            id: this.props.id
        }
        this.props.handleRating(this.props.id, star, card)
        localStorage.setItem(this.props.id, JSON.stringify(star))
    }

    setStar = () => {
        const star = localStorage.getItem(this.props.id);
        if (star === null) return 0
        else return star
    }



    render() {
        const {title, release_date, overview, poster_path, genre_ids, vote_average, personalRating} = this.props.movieProps;

        let imgUrl;
        if (poster_path === null) {
            imgUrl = 'https://media.istockphoto.com/vectors/no-image-available-icon-vector-id1216251206?k=20&m=1216251206&s=170667a&w=0&h=A72dFkHkDdSfmT6iWl6eMN9t_JZmqGeMoAycP-LMAw4='
        } else {
            imgUrl = `https://image.tmdb.org/t/p/original/${poster_path}`
        }
        /*От 0 до 3 - #E90000*/
        /*От 3 до 5 - #E97E00*/
        /*От 5 до 7 - #E9D100*/
        /*Выше 7 - #66E900*/
        let voteClassName = "movie-card__vote";
        if (vote_average < 3) voteClassName += ' low'
        if (vote_average >=3 && vote_average < 5) voteClassName += " moderate"
        if (vote_average >=5 && vote_average < 7) voteClassName += " high"
        if (vote_average >=7 ) voteClassName += " best"

        return (
            <li className="movie-card">
                <div className="movie-card__poster">
                    <img src={imgUrl} alt="zaglushka" />
                </div>
                <div className="movie-card__text-content ">
                    <div className="movie-card__header">
                        <h5 className='movie-card__title'>{title}</h5>
                        <h5 className='movie-card__title--hover'>{title}</h5>
                        <div className={voteClassName}>{vote_average}</div>
                        <div className="movie-card__date">{this.setDate(release_date)}</div>
                        <div className="movie-card__genres">
                            <GetGenresConsumer>
                                {value => this.getGenre(value, genre_ids)}
                            </GetGenresConsumer>
                        </div>
                    </div>

                    <div className="movie-card__overview">
                        {this._cutOverview(overview)}
                    </div>
                    <div className="movie-card__rating">
                        <Rate
                            count={10}
                            onChange={this.onRatingChange}
                            value={personalRating || this.setStar()}
                        />
                    </div>

                </div>
            </li>
        );
    }
}

Movie.defaultProps = {
    title: '',
    release_date: '',
    overview: '',
    poster_path: '',
    genre_ids: [],
    vote_average: 0,
    personalRating: 0
}

Movie.propTypes = {
    title: PropTypes.string,
    release_date: PropTypes.string,
    overview: PropTypes.string,
    poster_path: PropTypes.string,
    genre_ids: PropTypes.arrayOf(Object),
    vote_average: PropTypes.number,
    personalRating: PropTypes.number
}