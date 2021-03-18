import {Router} from 'express'

import CreateMovieService from '../services/CreateMovieService.js'
import AddCategoryService from '../services/AddCategoryService.js'
import DeleteMovieService from '../services/DeleteMovieService.js'
import UpdateMovieService from '../services/UpdateMovieService.js'

import movieRouter from './movie.routes.js'

const adminMovieRouter = Router()

adminMovieRouter.use(movieRouter)

//create movie
adminMovieRouter.post('/', async (request, response) => {
  const {title, synopsis, time} = request.body

  const createMovie = new CreateMovieService

  const newMovie = await createMovie.execute(title, synopsis, time)

  return response.status(201).json(newMovie)
})

//delete movie
adminMovieRouter.delete('/:id', async (request, response) => {
  const {id} = request.params

  const deleteMovie = new DeleteMovieService

  await deleteMovie.execute(id)

  return response.status(204).send()
})

//update movie
adminMovieRouter.put('/:id', async (request, response) => {
  const {title, synopsis, time} = request.body
  const {id} = request.params

  const updateMovie = new UpdateMovieService

  const updatedMovie = await updateMovie.execute(id, title, synopsis, time)

  return response.json(updatedMovie)
})

//add category to movie
adminMovieRouter.post('/:id', async (request, response) => {
  const {id} = request.params
  const {categoryTitle} = request.body
  
  const addCategory = new AddCategoryService

  const movieWithCategory = await addCategory.execute(id, categoryTitle)

  return response.json(movieWithCategory)
})

export default adminMovieRouter