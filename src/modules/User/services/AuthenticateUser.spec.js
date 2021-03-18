import 'babel-polyfill'
import '../../../database/index.js'

import webtoken from 'jsonwebtoken'

import authentication from '../../../config/auth.js'

import AppError from '../../../Error/AppError.js'
import User from '../../../models/User.js'

import CreateUserService from './CreateUserService.js'
import AuthenticateUserService from './AuthenticateUserService.js'

describe('Authenticate User', () => {
  beforeEach(async () => {
    await User.sync({force: true})
  })

  it('should be able to authenticate a user', async () => {
    const createUser = new CreateUserService
    const auth = new AuthenticateUserService

    const user = await createUser.execute('rafa', 'rafa@gmail.com', '123123')

    const userToken = await auth.execute('rafa@gmail.com', '123123')

    const {sub} = webtoken.verify(userToken, authentication.jwt.secret)

    expect(sub).toBe(user.id)
  })

  it('should throw an error if the user email is invalid', async () => {
    const createUser = new CreateUserService
    const auth = new AuthenticateUserService

    await createUser.execute('rafa', 'rafa@gmail.com', '123123')


    await expect(auth.execute('invalid@gmail.com', '123123')).rejects.toBeInstanceOf(AppError)
  })
  
  it('should throw an error if the user password is invalid', async () => {
    const createUser = new CreateUserService
    const auth = new AuthenticateUserService

    await createUser.execute('rafa', 'rafa@gmail.com', '123123')


    await expect(auth.execute('invalid@gmail.com', '0000000')).rejects.toBeInstanceOf(AppError)
  })
})