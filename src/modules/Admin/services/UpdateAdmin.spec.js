import 'babel-polyfill'
import '../../../database/index.js'

import bc from 'bcryptjs'

import AppError from '../../../Error/AppError.js'
import Admin from '../../../models/Admin.js'

import CreateAdminService from './CreateAdminService.js'
import UpdateAdminService from './UpdateAdminService.js'

describe('Update Admin', () => {
  beforeEach(async () => {
    await Admin.sync({force: true})
  })

  it('should be able to update a admin', async () => {
    const updateAdmin = new UpdateAdminService
    const createAdmin = new CreateAdminService

    const admin = await createAdmin.execute('rafa@gmail.com', '123123')
    await updateAdmin.execute(admin.id, 'rafael@gmail.com', '123456')

    const updatedAdmin = await Admin.findOne({
      where: {id: admin.id
    }})

    const comparePassword = await bc.compare('123456', updatedAdmin.password)

    expect(updatedAdmin).toHaveProperty('id')
    expect(updatedAdmin.email).toEqual('rafael@gmail.com')
    expect(comparePassword).toBe(true)
    expect(updatedAdmin).toBeInstanceOf(Admin)
  })

  it('should throw an error if the admin id is invalid', async () => {
    const createAdmin = new CreateAdminService
    const updateAdmin = new UpdateAdminService

    await createAdmin.execute('rafa@gmail.com', '123123')

    const invalidId = '9ed03170-86bc-11eb-a913-25eaac83e057'

    await expect(updateAdmin.execute(invalidId, 'rafael@gmail.com', '123456')).rejects.toBeInstanceOf(AppError)
  })
  
  it('should not be possible to update the admin email to an existing email other than his', async () => {
    const createAdmin = new CreateAdminService
    const updateAdmin = new UpdateAdminService

    const admin = await createAdmin.execute('rafa@gmail.com', '123123')
    await createAdmin.execute('rafa2@gmail.com', '123123')

    await expect(updateAdmin.execute(admin.id, 'rafa2@gmail.com', '123456')).rejects.toBeInstanceOf(AppError)
  })
})