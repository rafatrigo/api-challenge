import 'babel-polyfill'
import '../../../database/index.js'

import AppError from '../../../Error/AppError.js'
import Movie from '../../../models/Movie.js'
import User from '../../../models/User.js'

import CreateMovieService from './CreateMovieService.js'
import CreateUserService from '../../User/services/CreateUserService.js'

import UserWatchedMovies from '../../../models/UserWatchedMovies.js'
import UserMoviesToWatch from '../../../models/UserMoviesToWatch.js'

import AddToWatchListService from './AddToWatchListService.js'

describe('Add movie to watch list', () => {
  beforeEach(async () => {
    await Movie.sync({force: true})
    await User.sync({force: true})
    await UserWatchedMovies.sync({force: true})
    await UserMoviesToWatch.sync({force: true})
  })

  it('should be able to add a movie to watch list', async () => {
    const createMovie = new CreateMovieService
    const createUser = new CreateUserService
    const addToWatchList = new AddToWatchListService

    const movie = await createMovie.execute('movieTitle', 'synopsis', 90)

    const user = await createUser.execute('rafa', 'rafa@gmail.com', '123123')
    
    const movieUser = await addToWatchList.execute(movie.id, user.id)

    expect(movieUser[0]).toHaveProperty('MovieId')
    expect(movieUser[0]).toHaveProperty('UserId')
  })

  it('should throw an error if the movie id is nonexistent', async () => {
    const createUser = new CreateUserService
    const addToWatchList = new AddToWatchListService

    const user = await createUser.execute('rafa', 'rafa@gmail.com', '123123')

    const invalidId = '9ed03170-86bc-11eb-a913-25eaac83e057'

    await expect(addToWatchList.execute(invalidId, user.id)).rejects.toBeInstanceOf(AppError)
  })
})