import 'babel-polyfill'
import '../../../database/index.js'

import AppError from '../../../Error/AppError.js'
import Admin from '../../../models/Admin.js'

import CreateAdminService from './CreateAdminService.js'

describe('Create Admin', () => {
  beforeEach(async () => {
    await Admin.sync({force: true})
  })

  it('should be able to create a new admin', async () => {
    const createAdmin = new CreateAdminService

    const admin = await createAdmin.execute('rafa@gmail.com', '123123')

    const newAdmin = await Admin.findOne({
      where: {id: admin.id
    }})

    expect(newAdmin).toHaveProperty('id')
    expect(newAdmin.email).toEqual('rafa@gmail.com')
    expect(newAdmin).toBeInstanceOf(Admin)
  })

  it('should not be able to create a admin with the same email as an existing admin', async () => {
    const createAdmin = new CreateAdminService

    await createAdmin.execute('rafa@gmail.com', '123123')

    await expect(createAdmin.execute('rafa@gmail.com', '123123')).rejects.toBeInstanceOf(AppError)
  })
})