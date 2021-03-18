import 'babel-polyfill'
import '../../../database/index.js'

import AppError from '../../../Error/AppError.js'
import Category from '../../../models/Category.js'

import CreateCategoryService from './CreateCategoryService.js'
import FindCategoryService from './FindCategoryService.js'

describe('FindCategory', () => {
  beforeEach(async () => {
    await Category.sync({force: true})
  })

  it('should be able to find a category', async () => {
    const createCategory = new CreateCategoryService
    const findCategory = new FindCategoryService

    await createCategory.execute('categoryTitle')

    const category = await findCategory.execute('categoryTitle')

    expect(category).toHaveProperty('id')
    expect(category).toHaveProperty('title')
    expect(category.title).toEqual('categoryTitle')
    expect(category).toBeInstanceOf(Category)
    await expect(findCategory.execute('invalidTitle')).rejects.toBeInstanceOf(AppError)
  })
})