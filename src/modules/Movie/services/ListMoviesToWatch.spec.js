import 'babel-polyfill'
import '../../../database/index.js'

import Movie from '../../../models/Movie.js'
import User from '../../../models/User.js'
import UserWatchedMovies from '../../../models/UserWatchedMovies.js'
import UserMoviesToWatch from '../../../models/UserMoviesToWatch.js'

import CreateMovieService from './CreateMovieService.js'
import CreateUserService from '../../User/services/CreateUserService.js'
import ListMoviesToWatchService from './ListMoviesToWatchService.js'
import AddToWatchListService from './AddToWatchListService.js'

describe('Show to watch list', () => {
  beforeEach(async () => {
    await Movie.sync({force: true})
    await User.sync({force: true})
    await UserWatchedMovies.sync({force: true})
    await UserMoviesToWatch.sync({force: true})
  })

  it('should be able to show to watch list', async () => {
    const createMovie = new CreateMovieService
    const createUser = new CreateUserService
    const addToWatchList = new AddToWatchListService
    const listMoviesToWatch = new ListMoviesToWatchService

    const movie = await createMovie.execute('movieTitle', 'synopsis', 90)
    const movie2 = await createMovie.execute('movieTitle2', 'synopsis', 90)

    const user = await createUser.execute('rafa', 'rafa@gmail.com', '123123')
    
    await addToWatchList.execute(movie.id, user.id)
    await addToWatchList.execute(movie2.id, user.id)

    const toWatchList = await listMoviesToWatch.execute(user.id)

    expect(toWatchList.length).toEqual(2)
    expect(toWatchList[0].title).toEqual('movieTitle')
    expect(toWatchList[1].title).toEqual('movieTitle2')
  })
})