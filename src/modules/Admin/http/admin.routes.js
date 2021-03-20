import { Router } from 'express';

import DeleteAdminService from '../services/DeleteAdminService.js';
import UpdateAdminService from '../services/UpdateAdminService.js';
import adminCategoryRouter from '../../Category/http/adminCategory.routes.js';
import adminMovieRouter from '../../Movie/http/adminMovie.routes.js';

const adminRouter = Router();

adminRouter.use('/category', adminCategoryRouter);
adminRouter.use('/movie', adminMovieRouter);

//delete admin
adminRouter.delete('/', async (request, response) => {
  const id = request.user.id;

  const deleteAdmin = new DeleteAdminService();

  await deleteAdmin.execute(id);

  return response.status(204).send();
});

//update admin
adminRouter.put('/', async (request, response) => {
  const { email, password } = request.body;
  const id = request.user.id;

  const updateAdmin = new UpdateAdminService();

  const updatedAdmin = await updateAdmin.execute(id, email, password);

  return response.status(200).json(updatedAdmin);
});

export default adminRouter;
