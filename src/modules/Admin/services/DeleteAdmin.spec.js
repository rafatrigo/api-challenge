import 'babel-polyfill'
import '../../../database/index.js'

import AppError from '../../../Error/AppError.js'
import Admin from '../../../models/Admin.js'

import CreateAdminService from './CreateAdminService.js'
import DeleteAdminService from './DeleteAdminService.js'

describe('Delete Admin', () => {
  beforeEach(async () => {
    await Admin.sync({force: true})
  })

  it('should be able to delete a admin', async () => {
    const deleteAdmin = new DeleteAdminService
    const createAdmin = new CreateAdminService

    const admin = await createAdmin.execute('rafa@gmail.com', '123123')
    await deleteAdmin.execute(admin.id)

    const deletedAdmin = await Admin.findOne({
      where: {id: admin.id
    }})

    expect(deletedAdmin).toEqual(null)
  })

  it('should throw an error if the admin id is invalid', async () => {
    const createAdmin = new CreateAdminService
    const deleteAdmin = new DeleteAdminService

    await createAdmin.execute('rafa@gmail.com', '123123')

    const invalidId = '9ed03170-86bc-11eb-a913-25eaac83e057'

    await expect(deleteAdmin.execute(invalidId)).rejects.toBeInstanceOf(AppError)
  })
})