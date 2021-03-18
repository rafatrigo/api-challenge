import {Router} from 'express'

import DeleteAdminService from '../services/DeleteAdiminService.js'
import UpdateAdminService from '../services/UpdateAdminService.js'

const adminRouter = Router()


//delete admin
adminRouter.delete('/', async (request, response) => {
  const id = request.user.id

  const deleteAdmin = new DeleteAdminService

  await deleteAdmin.execute(id)

  return response.status(204).send()
})

//update admin
adminRouter.put('/', async (request, response) => {
  const {email, password} = request.body
  const id = request.user.id

  const updateAdmin = new UpdateAdminService

  const updatedAdmin = await updateAdmin.execute(id, email, password)

  return response.status(200).json(updatedAdmin)
})

export default adminRouter