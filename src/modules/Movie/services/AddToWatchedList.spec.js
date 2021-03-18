import 'babel-polyfill'
import '../../../database/index.js'

import AppError from '../../../Error/AppError.js'
import Movie from '../../../models/Movie.js'
import User from '../../../models/User.js'

import CreateMovieService from './CreateMovieService.js'
import CreateUserService from '../../User/services/CreateUserService.js'
import AddToWatchedListService from './AddToWatchedListService.js'
import UserWatchedMovies from '../../../models/UserWatchedMovies.js'
import UserMoviesToWatch from '../../../models/UserMoviesToWatch.js'

describe('Add movie to watched list', () => {
  beforeEach(async () => {
    await Movie.sync({force: true})
    await User.sync({force: true})
    await UserWatchedMovies.sync({force: true})
    await UserMoviesToWatch.sync({force: true})
  })

  it('should be able to add a movie to watched list', async () => {
    const createMovie = new CreateMovieService
    const createUser = new CreateUserService
    const addToWatchedList = new AddToWatchedListService

    const movie = await createMovie.execute('movieTitle', 'synopsis', 90)

    const user = await createUser.execute('rafa', 'rafa@gmail.com', '123123')
    
    const movieUser = await addToWatchedList.execute(movie.id, user.id)

    expect(movieUser[0]).toHaveProperty('MovieId')
    expect(movieUser[0]).toHaveProperty('UserId')
  })

  it('should throw an error if the movie id is nonexistent', async () => {
    const createUser = new CreateUserService
    const addToWatchedList = new AddToWatchedListService

    const user = await createUser.execute('rafa', 'rafa@gmail.com', '123123')

    const invalidId = '9ed03170-86bc-11eb-a913-25eaac83e057'

    await expect(addToWatchedList.execute(invalidId, user.id)).rejects.toBeInstanceOf(AppError)
  })
})