import 'babel-polyfill'
import '../../../database/index.js'

import AppError from '../../../Error/AppError.js'
import Movie from '../../../models/Movie.js'

import CreateMovieService from './CreateMovieService.js'
import DeleteMovieService from './DeleteMovieService.js'

describe('Delete Movie', () => {
  beforeEach(async () => {
    await Movie.sync({force: true})
  })

  it('should be able to delete a movie', async () => {
    const createMovie = new CreateMovieService
    const deleteMovie = new DeleteMovieService

    const movie = await createMovie.execute('movieTitle', 'synopsis', 90)

    await deleteMovie.execute(movie.id)
    
    const deletedMovie = await Movie.findOne({where: {id: movie.id}})

    expect(deletedMovie).toBe(null)
  })

  it('should throw an error if the movie id is invalid', async () => {
    const deleteMovie = new DeleteMovieService

    const invalidId = '9ed03170-86bc-11eb-a913-25eaac83e057'

    await expect(deleteMovie.execute(invalidId)).rejects.toBeInstanceOf(AppError)
  })
})