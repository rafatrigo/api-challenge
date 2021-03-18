import 'babel-polyfill'
import '../../../database/index.js'

import AppError from '../../../Error/AppError.js'
import Category from '../../../models/Category.js'
import Movie from '../../../models/Movie.js'
import MovieCategories from '../../../models/MovieCategories.js'

import CreateCategoryService from '../../Category/services/CreateCategoryService.js'
import CreateMovieService from './CreateMovieService.js'
import AddCategoryService from '../services/AddCategoryService.js'

describe('Add Category to movie', () => {
  beforeEach(async () => {
    await Category.sync({force: true})
    await Movie.sync({force: true})
    await MovieCategories.sync({force: true})
  })

  it('should be able to add a category to a movie', async () => {
    const createCategory = new CreateCategoryService
    const createMovie = new CreateMovieService
    const addCategory = new AddCategoryService

    await createCategory.execute('categoryTitle')

    const movie = await createMovie.execute('movieTitle', 'synopsis', 90)

    const movieCategory = await addCategory.execute(movie.id, 'categoryTitle')

    expect(movieCategory[0]).toHaveProperty('MovieId')
    expect(movieCategory[0]).toHaveProperty('CategoryId')
  })

  it('should throw an error if the movie id is nonexistent', async () => {
    const createCategory = new CreateCategoryService
    const createMovie = new CreateMovieService
    const addCategory = new AddCategoryService

    await createCategory.execute('categoryTitle')

    await createMovie.execute('movieTitle', 'synopsis', 90)

    const invalidId = '9ed03170-86bc-11eb-a913-25eaac83e057'

    await expect(addCategory.execute(invalidId, 'categoryTitle')).rejects.toBeInstanceOf(AppError)
  })

  it('should throw an error if the category title is nonexistent', async () => {
    const createMovie = new CreateMovieService
    const addCategory = new AddCategoryService

    const movie = await createMovie.execute('movieTitle', 'synopsis', 90)

    await expect(addCategory.execute(movie.id, 'nonexistentTitle')).rejects.toBeInstanceOf(AppError)
  })
})