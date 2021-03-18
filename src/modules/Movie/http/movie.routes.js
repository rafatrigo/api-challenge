import {Router} from 'express'

import ListMoviesService from '../services/ListMoviesService.js'
import FindMoviesByTitleService from '../services/FindMoviesByTitleService.js'
import FindMoviesByCategory from '../services/FindMovieByCategory.js'
import AddToWatchListService from '../services/AddToWatchListService.js'
import AddToWatchedListService from '../services/AddToWatchedListService.js'
import ListMoviesToWatchService from '../services/ListMoviesToWatchService.js'
import ListWatchedMoviesService from '../services/ListWatchedMoviesService.js'

const movieRouter = Router()

//list movies
movieRouter.get('/', async (request, response) => {
  const listMovies = new ListMoviesService

  const list = await listMovies.execute()

  return response.json(list)
})

//list movies to watch
movieRouter.get('/toWatch', async (request, response) => {
  const id = request.user.id
  const listMoviesToWatch = new ListMoviesToWatchService

  const list = await listMoviesToWatch.execute(id)

  return response.json(list)
})

//list watched movies
movieRouter.get('/Watched', async (request, response) => {
  const id = request.user.id
  const listWatchedMovies = new ListWatchedMoviesService

  const list = await listWatchedMovies.execute(id)

  return response.json(list)
})



//find by name
movieRouter.get('/search', async (request, response) => {
  const {title} = request.body

  const findMovies = new FindMoviesByTitleService

  const movies = await findMovies.execute(title)

  return response.json(movies)
})

//find by category
movieRouter.get('/search/category', async (request, response) => {
  const {categoryTitle} = request.body

  const findMovies = new FindMoviesByCategory

  const movies = await findMovies.execute(categoryTitle)

  return response.json(movies)
})

// add to watch list
movieRouter.post('/toWatch/:movieId', async (request, response) => {
  const userId = request.user.id
  const {movieId} = request.params

  const AddToWatchList = new AddToWatchListService

  const movieToWatch = await AddToWatchList.execute(movieId, userId)

  return response.json(movieToWatch)
})

//add to watched list
movieRouter.post('/watch/:movieId', async (request, response) => {
  const userId = request.user.id
  const {movieId} = request.params

  const AddToWatchedList = new AddToWatchedListService

  const movieWatched = await AddToWatchedList.execute(movieId, userId)

  return response.json(movieWatched)
})

export default movieRouter