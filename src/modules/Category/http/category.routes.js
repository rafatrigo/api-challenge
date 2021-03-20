import { Router } from 'express';

import ListCategoriesService from '../services/ListCategoriesService.js';
import FindCategoryService from '../services/FindCategoryService.js';

const categoryRouter = Router();

//list categories
categoryRouter.get('/', async (request, response) => {
  const listCategories = new ListCategoriesService();

  const list = await listCategories.execute();

  return response.json(list);
});

//find category
categoryRouter.get('/search', async (request, response) => {
  const { title } = request.body;

  const findCategory = new FindCategoryService();

  const category = await findCategory.execute(title);

  return response.json(category);
});

export default categoryRouter;
