import 'babel-polyfill'
import '../../../database/index.js'

import AppError from '../../../Error/AppError.js'
import Category from '../../../models/Category.js'

import CreateCategoryService from './CreateCategoryService.js'
import DeleteCategoryService from './DeleteCategoryService.js'

describe('DeleteCategory', () => {
  beforeEach(async () => {
    await Category.sync({force: true})
  })

  it('should be able to delete a category', async () => {
    const deleteCategory = new DeleteCategoryService
    const createCategory = new CreateCategoryService

    await createCategory.execute('categoryTitle')

    const newCategory = await Category.findOne({
      where: {title: 'categoryTitle'
    }})

    await deleteCategory.execute(newCategory.id)

    const deletedCategory = await Category.findOne({
      where: {title: 'categoryTitle'
    }})

    expect(deletedCategory).toBe(null)
  })

  it('should not be able to delete a non-existent category', async () => {
    const deleteCategory = new DeleteCategoryService

    const invalidId = '9ed03170-86bc-11eb-a913-25eaac83e057'

    await expect(deleteCategory.execute(invalidId)).rejects.toBeInstanceOf(AppError)
  })
})