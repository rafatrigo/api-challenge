import {Router} from 'express'

import DeleteUserService from '../services/DeleteUserService.js'
import UpdateUserService from '../services/UpdateUserService.js'

const userRouter = Router()

//delete user
userRouter.delete('/', async (request, response) => {
  const id = request.user.id

  const deleteUser = new DeleteUserService

  await deleteUser.execute(id)

  return response.status(204).send()
})

//update user
userRouter.put('/', async (request, response) => {
  const {username, email, password} = request.body
  const id = request.user.id

  const updateUser = new UpdateUserService

  const updatedUser = await updateUser.execute(id, username, email, password)

  return response.status(200).json(updatedUser)
})

export default userRouter