import 'babel-polyfill'
import '../../../database/index.js'

import AppError from '../../../Error/AppError.js'
import Category from '../../../models/Category.js'

import CreateCategoryService from './CreateCategoryService.js'

describe('CreateCategory', () => {
  beforeEach(async () => {
    await Category.sync({force: true})
  })

  it('should be able to create a new category', async () => {
    const createCategory = new CreateCategoryService

    await createCategory.execute('categoryTitle')

    const newCategory = await Category.findOne({
      where: {title: 'categoryTitle'
    }})

    expect(newCategory).toHaveProperty('id')
    expect(newCategory).toHaveProperty('title')
    expect(newCategory.title).toEqual('categoryTitle')
    expect(newCategory).toBeInstanceOf(Category)
  })

  it('should not be able to create a category with the same name as an existing category', async () => {
    const createCategory = new CreateCategoryService

    await createCategory.execute('SameName')

    await expect(createCategory.execute('SameName')).rejects.toBeInstanceOf(AppError)
  })
})