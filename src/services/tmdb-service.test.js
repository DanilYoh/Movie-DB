import { afterEach, describe, expect, it, vi } from 'vitest'

import TMDBService from './tmdb-service'

afterEach(() => vi.restoreAllMocks())

describe('TMDBService', () => {
  it('encodes search parameters and keeps the API key outside source code', async () => {
    const fetchMock = vi.spyOn(globalThis, 'fetch').mockResolvedValue({
      ok: true,
      json: async () => ({ results: [] })
    })
    const service = new TMDBService('test-key')

    await service.getMovies('star wars', 2)

    expect(fetchMock).toHaveBeenCalledWith(
      'https://api.themoviedb.org/3/search/movie?api_key=test-key&query=star+wars&page=2',
      expect.objectContaining({ mode: 'cors' })
    )
  })

  it('fails with an actionable message when the key is missing', () => {
    const service = new TMDBService('')

    expect(() => service.buildUrl('search/movie')).toThrow(
      'VITE_TMDB_API_KEY is required'
    )
  })
})
