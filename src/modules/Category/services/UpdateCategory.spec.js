import 'babel-polyfill'
import '../../../database/index.js'

import AppError from '../../../Error/AppError.js'
import Category from '../../../models/Category.js'

import CreateCategoryService from './CreateCategoryService.js'
import UpdateCategoryService from './UpdateCategoryService.js'

describe('UpdateCategory', () => {
  beforeEach(async () => {
    await Category.sync({force: true})
  })

  it('should be able to update a category', async () => {
    const createCategory = new CreateCategoryService
    const updateCategory = new UpdateCategoryService

    const category = await createCategory.execute('categoryTitle1')

    await updateCategory.execute(category.id, 'newTitle')

    const updatedCategory = await Category.findOne({where: {id: category.id}})

    expect(updatedCategory).toHaveProperty('title')
    expect(updatedCategory.title).toEqual('newTitle')
  })

  it('should throw an error if the id is nonexistent', async () => {
    const createCategory = new CreateCategoryService
    const updateCategory = new UpdateCategoryService

    const category = await createCategory.execute('categoryTitle1')

    const invalidId = '9ed03170-86bc-11eb-a913-25eaac83e057'

    await expect(updateCategory.execute(invalidId, 'newTitle')).rejects.toBeInstanceOf(AppError)
  })
})