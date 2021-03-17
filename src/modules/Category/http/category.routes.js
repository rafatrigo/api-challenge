import {Router} from 'express'

import CreateCategoryService from '../services/CreateCategoryService.js'
import ListCategoriesService from '../services/ListCategoriesService.js'
import DeleteCategoryService from '../services/DeleteCategoryService.js'
import UpdateCategoryService from '../services/UpdateCategoryService.js'
import FindCategoryService from '../services/FindCategoryService.js'

const categoryRouter = Router()

//create category
categoryRouter.post('/', async (request, response) => {
  const {title} = request.body

  const createCategory = new CreateCategoryService

  const newCategory = await createCategory.execute(title)

  return response.status(201).json(newCategory)
})

//list categories
categoryRouter.get('/', async (request, response) => {
  const listCategories = new ListCategoriesService

  const list = await listCategories.execute()

  return response.json(list)
})

//find category
categoryRouter.get('/search', async (request, response) => {
  const {title} = request.body

  const findCategory = new FindCategoryService

  const category = await findCategory.execute(title)

  return response.json(category)
})

//delete category
categoryRouter.delete('/:id', async (request, response) => {
  const {id} = request.params

  const deleteCategory = new DeleteCategoryService

  await deleteCategory.execute(id)

  return response.status(204).send()
})

//update category
categoryRouter.put('/:id', async (request, response) => {
  const {id} = request.params
  const {title} = request.body

  const updateCategory = new UpdateCategoryService

  const updatedCategory = await updateCategory.execute(id, title)

  return response.status(200).json(updatedCategory)
})

export default categoryRouter