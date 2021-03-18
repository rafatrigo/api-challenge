import 'babel-polyfill'
import '../../../database/index.js'

import AppError from '../../../Error/AppError.js'
import Movie from '../../../models/Movie.js'

import CreateMovieService from './CreateMovieService.js'
import UpdateMovieService from './UpdateMovieService.js'

describe('Update Movie', () => {
  beforeEach(async () => {
    await Movie.sync({force: true})
  })

  it('should be able to update a movie', async () => {
    const createMovie = new CreateMovieService
    const updateMovie = new UpdateMovieService

    const movie = await createMovie.execute('movieTitle', 'synopsis', 90)
    const updatedMovie = await updateMovie.execute(movie.id, 'newTitle', 'newSynopsis', 93)

    expect(updatedMovie.id).toEqual(movie.id)
    expect(updatedMovie).toHaveProperty('title')
    expect(updatedMovie.title).toEqual('newTitle')
    expect(updatedMovie).toHaveProperty('synopsis')
    expect(updatedMovie.synopsis).toEqual('newSynopsis')
    expect(updatedMovie).toHaveProperty('time')
    expect(updatedMovie.time).toEqual(93)
  })

  it('should throw an error if the movie is not found', async () => {
    const createMovie = new CreateMovieService
    const updateMovie = new UpdateMovieService

    await createMovie.execute('movieTitle', 'synopsis', 90)

    const invalidId = '9ed03170-86bc-11eb-a913-25eaac83e057'

    await expect(updateMovie.execute(invalidId, 'newTitle', 'newSynopsis', 93))
      .rejects.toBeInstanceOf(AppError)
  })
})