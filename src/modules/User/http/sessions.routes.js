import {Router} from 'express'

import CreateUserService from '../services/CreateUserService.js'
import AuthenticateUserService from '../services/AuthenticateUserService.js'

const sessionsRouter = Router()

//create user
sessionsRouter.post('/signUp', async (request, response) => {
  const {username, email, password} = request.body

  const createUser = new CreateUserService

  const newUser = await createUser.execute(username, email, password)

  return response.status(201).json(newUser)
})

//authenticate user
sessionsRouter.post('/signIn', async (request, response) => {
  const {email, password} = request.body

  const auth = new AuthenticateUserService

  const token = await auth.execute(email, password)

  return response.json(token)
})


export default sessionsRouter