import 'babel-polyfill'
import '../../../database/index.js'

import Movie from '../../../models/Movie.js'
import User from '../../../models/User.js'
import UserWatchedMovies from '../../../models/UserWatchedMovies.js'
import UserMoviesToWatch from '../../../models/UserMoviesToWatch.js'

import CreateMovieService from './CreateMovieService.js'
import CreateUserService from '../../User/services/CreateUserService.js'
import ListWatchedMoviesService from './ListWatchedMoviesService.js'
import AddToWatchedListService from './AddToWatchedListService.js'

describe('Show to watched list', () => {
  beforeEach(async () => {
    await Movie.sync({force: true})
    await User.sync({force: true})
    await UserWatchedMovies.sync({force: true})
    await UserMoviesToWatch.sync({force: true})
  })

  it('should be able to show to watched list', async () => {
    const createMovie = new CreateMovieService
    const createUser = new CreateUserService
    const addToWatchedList = new AddToWatchedListService
    const listWatchedMovies = new ListWatchedMoviesService

    const movie = await createMovie.execute('movieTitle', 'synopsis', 90)
    const movie2 = await createMovie.execute('movieTitle2', 'synopsis', 90)

    const user = await createUser.execute('rafa', 'rafa@gmail.com', '123123')
    
    await addToWatchedList.execute(movie.id, user.id)
    await addToWatchedList.execute(movie2.id, user.id)

    const watchedList = await listWatchedMovies.execute(user.id)

    expect(watchedList.length).toEqual(2)
    expect(watchedList[0].title).toEqual('movieTitle')
    expect(watchedList[1].title).toEqual('movieTitle2')
  })
})