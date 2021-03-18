import 'babel-polyfill'
import '../../../database/index.js'

import webtoken from 'jsonwebtoken'

import authentication from '../../../config/auth.js'

import AppError from '../../../Error/AppError.js'
import Admin from '../../../models/Admin.js'

import CreateAdminService from './CreateAdminService.js'
import AuthenticateAdminService from './AuthenticateAdminService.js'

describe('Authenticate Admin', () => {
  beforeEach(async () => {
    await Admin.sync({force: true})
  })

  it('should be able to authenticate a admin', async () => {
    const createAdmin = new CreateAdminService
    const auth = new AuthenticateAdminService

    const admin = await createAdmin.execute('rafa@gmail.com', '123123')

    const adminToken = await auth.execute('rafa@gmail.com', '123123')

    const {sub} = webtoken.verify(adminToken, authentication.jwt.secret)

    expect(sub).toBe(admin.id)
  })

  it('should throw an error if the admin email is invalid', async () => {
    const createAdmin = new CreateAdminService
    const auth = new AuthenticateAdminService

    await createAdmin.execute('rafa@gmail.com', '123123')


    await expect(auth.execute('invalid@gmail.com', '123123')).rejects.toBeInstanceOf(AppError)
  })
  
  it('should throw an error if the admin password is invalid', async () => {
    const createAdmin = new CreateAdminService
    const auth = new AuthenticateAdminService

    await createAdmin.execute('rafa@gmail.com', '123123')


    await expect(auth.execute('invalid@gmail.com', '0000000')).rejects.toBeInstanceOf(AppError)
  })
})