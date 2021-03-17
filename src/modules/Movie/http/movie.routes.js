import {Router} from 'express'

import CreateMovieService from '../services/CreateMovieService.js'
import ListMoviesService from '../services/ListMoviesService.js'
import AddCategoryService from '../services/AddCategoryService.js'
import DeleteMovieService from '../services/DeleteMovieService.js'
import UpdateMovieService from '../services/UpdateMovieService.js'
import FindMoviesByTitleService from '../services/FindMoviesByTitleService.js'
import FindMoviesByCategory from '../services/FindMovieByCategory.js'
import AddToWatchListService from '../services/AddToWatchListService.js'
import AddToWatchedListService from '../services/AddToWatchedListService.js'
import ListMoviesToWatchService from '../services/ListMoviesToWatchService.js'
import ListWatchedMoviesService from '../services/ListWatchedMoviesService.js'

const movieRouter = Router()

//create movie
movieRouter.post('/', async (request, response) => {
  const {title, synopsis, time} = request.body

  const createMovie = new CreateMovieService

  const newMovie = await createMovie.execute(title, synopsis, time)

  return response.status(201).json(newMovie)
})

//delete movie
movieRouter.delete('/:id', async (request, response) => {
  const {id} = request.params

  const deleteMovie = new DeleteMovieService

  await deleteMovie.execute(id)

  return response.status(204).send()
})

//update movie
movieRouter.put('/:id', async (request, response) => {
  const {title, synopsis, time} = request.body
  const {id} = request.params

  const updateMovie = new UpdateMovieService

  const updatedMovie = await updateMovie.execute(id, title, synopsis, time)

  return response.json(updatedMovie)
})

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

//add category to movie
movieRouter.post('/:id', async (request, response) => {
  const {id} = request.params
  const {categoryTitle} = request.body
  
  const addCategory = new AddCategoryService

  const movieWithCategory = await addCategory.execute(id, categoryTitle)

  return response.json(movieWithCategory)
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

  await AddToWatchList.execute(movieId, userId)

  return response.status(200).send()
})

//add to watched list
movieRouter.post('/watch/:movieId', async (request, response) => {
  const userId = request.user.id
  const {movieId} = request.params

  const AddToWatchedList = new AddToWatchedListService

  await AddToWatchedList.execute(movieId, userId)

  return response.status(200).send()
})

export default movieRouter