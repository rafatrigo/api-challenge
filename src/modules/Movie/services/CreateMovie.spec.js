import 'babel-polyfill'
import '../../../database/index.js'

import AppError from '../../../Error/AppError.js'
import Movie from '../../../models/Movie.js'

import CreateMovieService from './CreateMovieService.js'

describe('Create Movie', () => {
  beforeEach(async () => {
    await Movie.sync({force: true})
  })

  it('should be able to create a movie', async () => {
    const createMovie = new CreateMovieService

    const movie = await createMovie.execute('movieTitle', 'synopsis', 90)

    expect(movie).toHaveProperty('id')
    expect(movie).toHaveProperty('title')
    expect(movie.title).toEqual('movieTitle')
    expect(movie).toHaveProperty('synopsis')
    expect(movie.synopsis).toEqual('synopsis')
    expect(movie).toHaveProperty('time')
    expect(movie.time).toEqual(90)
  })

  it('should throw an error if the movie already exist', async () => {
    const createMovie = new CreateMovieService

    await createMovie.execute('movieTitle', 'synopsis', 90)

    await expect(createMovie.execute('movieTitle', 'synopsis', 90)).rejects.toBeInstanceOf(AppError)
  })
})