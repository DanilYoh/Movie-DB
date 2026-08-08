import React from "react";

import {Button, Pagination, Tabs, Result} from "antd";

import MovieList from "../movie-list";
import Spinner from "../spinner";
import SearchBar from "../search-bar";

import TMDBService from "../../services/tmdb-service";
import {GetGenresProvider} from "../../services/tmdb-service-context";

import "./app.css"

const {TabPane} = Tabs;

export default class App extends React.Component {


    state = {
        query: null,
        page: 1,
        moviesList: [],
        loading: true,
        pageTotal: 0,
        genres: [],
        requestFailed: false,
        ratedMovies: JSON.parse(localStorage.getItem('rated')) || [],
    }

    TMDBService = new TMDBService();
    storage = window.localStorage;

    async updateMovies(query, page=1) {
        this.setState({
            loading: true,
            requestFailed: false
        })

        try {
            const res = await this.TMDBService.getMovies(query, page)

            this.setState({
                moviesList: Array.isArray(res.results) ? res.results : [],
                page,
                loading: false,
                pageTotal: res.total_results || 0,
                query,
                requestFailed: false
            })
        } catch {
            this.setState({
                moviesList: [],
                page,
                loading: false,
                pageTotal: 0,
                query,
                requestFailed: true
            })
        }
    }

   handleRating = async (id, star, data) => {
        this.setState(({ratedMovies}) => {
            let store = ratedMovies;
            const idx = ratedMovies.findIndex(i => i.id === data.id);
            if (store.length === 0) {
                store.push(data)
            } else if (store.length > 0) {
                if (idx === -1) {
                    store.push(data)
                } else {
                    store = [
                        ...ratedMovies.slice(0, idx),
                        data,
                        ...ratedMovies.slice(idx + 1)
                    ]
                }
            }
            localStorage.setItem('rated', JSON.stringify(store))
            return {
                ratedMovies: store
            }
        })

   }

    onSearch = (value='return') => {
        this.updateMovies(value, 1);
    }

    onPageChange = (curPage) => {
        window.scroll({
            top: 0
        })
        this.updateMovies(this.state.query, curPage)

    }

    setMovies() {
        this.updateMovies('return', 1)
    }

    setGenres = async () => {
        try {
            const genres = await this.TMDBService.getGenres()
            this.setState({genres})
        } catch {
            this.setState({genres: []})
        }
    }

    retryMovies = () => {
        this.updateMovies(this.state.query || 'return', this.state.page || 1)
    }

    componentDidMount() {
        this.setMovies();
        this.setGenres();
    }



    render() {
        const {moviesList, loading, pageTotal, page, ratedMovies, requestFailed} = this.state;
        const spinner = loading? <Spinner/> : null
        const contentSearch = <MovieList moviesList={moviesList} handleRating={this.handleRating}/> ;
        const contentRated = <MovieList moviesList={ratedMovies} handleRating={this.handleRating}/> ;
        const requestError = requestFailed ? <Result
            status="error"
            title="Не удалось загрузить фильмы"
            subTitle="Сервис TMDB не ответил. Проверьте подключение или настройки API и попробуйте ещё раз."
            extra={<Button type="primary" onClick={this.retryMovies}>Повторить</Button>}
        /> : null

        const pagination =  moviesList.length !== 0 ? <Pagination
            total={pageTotal}
            onChange={(e) => this.onPageChange(e)}
            style={{display: 'flex', justifyContent: 'center', marginTop: '10px', marginBottom: '10px'}}
            size='small'
            current={page}
            pageSize={20}
            showSizeChanger={false}
        /> : null

        return (
            <GetGenresProvider value={this.state.genres}>
                <div className='app'>
                    <Tabs defaultActiveKey="1" centered>
                        <TabPane tab="Search" key='1'>
                            <SearchBar onSearchMovie={this.onSearch}/>
                            {requestError || contentSearch}
                            {spinner}
                            {!requestFailed && pagination}
                        </TabPane>
                        <TabPane tab="Rated" key='2'>
                            {contentRated}
                        </TabPane>
                    </Tabs>
                </div>
            </GetGenresProvider>
        )
    }
}
