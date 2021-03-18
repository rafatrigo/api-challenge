import 'babel-polyfill'
import '../../../database/index.js'

import Movie from '../../../models/Movie.js'

import CreateMovieService from './CreateMovieService.js'
import ListMoviesService from './ListMoviesService.js'

describe('List movies', () => {
  beforeEach(async () => {
    await Movie.sync({force: true})
  })

  it('should be able to list all movies', async () => {
    const createMovie = new CreateMovieService
    const listMovies = new ListMoviesService

    await createMovie.execute('movie Title', 'synopsis', 90)
    await createMovie.execute('movie Title 2', 'synopsis', 90)

    const moviesList = await listMovies.execute()

    expect(moviesList.count).toEqual(2)
    expect(moviesList.rows[0].title).toEqual('movie Title')
    expect(moviesList.rows[1].title).toEqual('movie Title 2')
  })
})