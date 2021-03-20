import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

import CreateUserService from '../../modules/User/services/CreateUserService.js';
import AuthenticateUserService from '../../modules/User/services/AuthenticateUserService.js';
import CreateAdminService from '../../modules/Admin/services/CreateAdminService.js';
import AuthenticateAdminService from '../../modules/Admin/services/AuthenticateAdminService.js';

const sessionsRouter = Router();

//create user
sessionsRouter.post(
  '/signUp',
  celebrate({
    [Segments.BODY]: {
      username: Joi.string().required(),
      email: Joi.string().email().required(),
      password: Joi.string().required(),
    },
  }),
  async (request, response) => {
    const { username, email, password } = request.body;

    const createUser = new CreateUserService();

    const newUser = await createUser.execute(username, email, password);

    return response.status(201).json(newUser);
  },
);

//authenticate user
sessionsRouter.post(
  '/signIn',
  celebrate({
    [Segments.BODY]: {
      email: Joi.string().email().required(),
      password: Joi.string().required(),
    },
  }),
  async (request, response) => {
    const { email, password } = request.body;

    const auth = new AuthenticateUserService();

    const token = await auth.execute(email, password);

    return response.json({ token });
  },
);

//create admin
sessionsRouter.post(
  '/admin/signUp',
  celebrate({
    [Segments.BODY]: {
      email: Joi.string().email().required(),
      password: Joi.string().required(),
    },
  }),
  async (request, response) => {
    const { email, password } = request.body;

    const createAdmin = new CreateAdminService();

    const newAdmin = await createAdmin.execute(email, password);

    return response.status(201).json(newAdmin);
  },
);

//authenticate admin
sessionsRouter.post(
  '/admin/signIn',
  celebrate({
    [Segments.BODY]: {
      email: Joi.string().email().required(),
      password: Joi.string().required(),
    },
  }),
  async (request, response) => {
    const { email, password } = request.body;

    const auth = new AuthenticateAdminService();

    const token = await auth.execute(email, password);

    return response.json({ token });
  },
);

export default sessionsRouter;
