import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

import categoryRouter from './category.routes.js';

import CreateCategoryService from '../services/CreateCategoryService.js';
import DeleteCategoryService from '../services/DeleteCategoryService.js';
import UpdateCategoryService from '../services/UpdateCategoryService.js';

const adminCategoryRouter = Router();

adminCategoryRouter.use(categoryRouter);

//create category
adminCategoryRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      title: Joi.string().required(),
    },
  }),
  async (request, response) => {
    const { title } = request.body;

    const createCategory = new CreateCategoryService();

    const newCategory = await createCategory.execute(title);

    return response.status(201).json(newCategory);
  },
);

//delete category
adminCategoryRouter.delete(
  '/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required(),
    },
  }),
  async (request, response) => {
    const { id } = request.params;

    const deleteCategory = new DeleteCategoryService();

    await deleteCategory.execute(id);

    return response.status(204).send();
  },
);

//update category
adminCategoryRouter.put(
  '/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required(),
    },
    [Segments.BODY]: {
      title: Joi.string().required(),
    },
  }),
  async (request, response) => {
    const { id } = request.params;
    const { title } = request.body;

    const updateCategory = new UpdateCategoryService();

    const updatedCategory = await updateCategory.execute(id, title);

    return response.status(200).json(updatedCategory);
  },
);

export default adminCategoryRouter;
