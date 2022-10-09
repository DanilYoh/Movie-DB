export default class TMDBService {

    #API_URL = 'https://api.themoviedb.org/3/';

    #API_Key = 'api_key=6128513be2e1623e21bfbd12acfe302b';

    _apiBase = (`${this.#API_URL}search/movie?${this.#API_Key}`);
    _apiGenres = (`${this.#API_URL}genre/movie/lists?${this.#API_Key}`);

    async getResource(url) {
        const response = await fetch(url, {
            mode: "cors",
            header: {
                "content-type": "application/json",
            }
        });

        if (!response.ok) {
            throw new Error(`could not fetch ${url}, received ${response.status}`);
        }
        const body = await response.json();
        return body;
    }

    async getMovies(query, page) {
        const searchUrl = `${this._apiBase}&query=${query}&page=${page}`;
        const movies = await this.getResource(searchUrl);
        return movies;
    }

    async getReturn() {
        const urlReturn = `${this._apiBase}&query='return'`;
        const moviesReturn = await this.getResource(urlReturn);
        return moviesReturn
    }

    async getGenres() {
        const {genres} = await this.getResource(this._apiGenres);
        return genres;
    }

}