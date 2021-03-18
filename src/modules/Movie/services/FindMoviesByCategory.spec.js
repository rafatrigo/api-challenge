import 'babel-polyfill'
import '../../../database/index.js'

import AppError from '../../../Error/AppError.js'
import Movie from '../../../models/Movie.js'
import Category from '../../../models/Category.js'
import MovieCategories from '../../../models/MovieCategories.js'

import CreateMovieService from './CreateMovieService.js'
import CreateCategoryService from '../../Category/services/CreateCategoryService.js'
import FindMoviesByCategoryService from './FindMovieByCategory.js'
import AddCategoryService from './AddCategoryService.js'

describe('Find movies by category', () => {
  beforeEach(async () => {
    await Movie.sync({force: true})
    await Category.sync({force: true})
    await MovieCategories.sync({force: true})
  })

  it('should be able to find movies by category', async () => {
    const createMovie = new CreateMovieService
    const createCategory = new CreateCategoryService
    const addCategory = new AddCategoryService
    const findByCategory = new FindMoviesByCategoryService

    await createCategory.execute('categoryTitle')

    const movie = await createMovie.execute('movieTitle', 'synopsis', 90)

    await addCategory.execute(movie.id, 'categoryTitle')

    const movieFound = await findByCategory.execute('categoryTitle')

    expect(movieFound[0].title).toEqual('movieTitle')
  })

  it('should throw an error if the category title is invalid', async () => {
    const createMovie = new CreateMovieService
    const createCategory = new CreateCategoryService
    const addCategory = new AddCategoryService
    const findByCategory = new FindMoviesByCategoryService

    await createCategory.execute('categoryTitle')

    const movie = await createMovie.execute('movieTitle', 'synopsis', 90)

    await addCategory.execute(movie.id, 'categoryTitle')

    await expect(findByCategory.execute('invalidTitle')).rejects.toBeInstanceOf(AppError)
  })
})