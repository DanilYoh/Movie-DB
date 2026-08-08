const API_URL = 'https://api.themoviedb.org/3'

export default class TMDBService {
  constructor(apiKey = import.meta.env.VITE_TMDB_API_KEY) {
    this.apiKey = apiKey
  }

  buildUrl(path, params = {}) {
    if (!this.apiKey) {
      throw new Error('VITE_TMDB_API_KEY is required')
    }

    const searchParams = new URLSearchParams({
      api_key: this.apiKey,
      ...params
    })

    return `${API_URL}/${path}?${searchParams.toString()}`
  }

  async getResource(url) {
    const response = await fetch(url, {
      mode: 'cors',
      headers: {
        'content-type': 'application/json'
      }
    })

    if (!response.ok) {
      throw new Error(`TMDB request failed (${response.status})`)
    }

    return response.json()
  }

  getMovies(query, page) {
    return this.getResource(
      this.buildUrl('search/movie', { query, page: String(page) })
    )
  }

  getReturn() {
    return this.getMovies('return', 1)
  }

  async getGenres() {
    const { genres } = await this.getResource(this.buildUrl('genre/movie/list'))
    return genres
  }
}
