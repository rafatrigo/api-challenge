import 'babel-polyfill'
import '../../../database/index.js'

import Category from '../../../models/Category.js'
import Movie from '../../../models/Movie.js'
import MovieCategories from '../../../models/MovieCategories.js'

import CreateCategoryService from './CreateCategoryService.js'
import ListCategoriesService from './ListCategoriesService.js'

describe('ListCategories', () => {
  beforeEach(async () => {
    await Category.sync({force: true})
    await Movie.sync({force: true})
    await MovieCategories.sync({force: true})
  })

  it('should be able to list all categories', async () => {
    const createCategory = new CreateCategoryService
    const listCategory = new ListCategoriesService

    await createCategory.execute('categoryTitle1')
    await createCategory.execute('categoryTitle2')
    await createCategory.execute('categoryTitle3')

    await listCategory.execute()

    const categories = await Category.findAll()

    expect(categories.length).toEqual(3)
    expect(categories[0]).toHaveProperty('id')
    expect(categories[0]).toHaveProperty('title')
    expect(categories[0].title).toEqual('categoryTitle1')
    expect(categories[1]).toHaveProperty('id')
    expect(categories[1]).toHaveProperty('title')
    expect(categories[1].title).toEqual('categoryTitle2')
    expect(categories[2]).toHaveProperty('id')
    expect(categories[2]).toHaveProperty('title')
    expect(categories[2].title).toEqual('categoryTitle3')
  })
})