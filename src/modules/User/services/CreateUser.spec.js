import 'babel-polyfill'
import '../../../database/index.js'

import AppError from '../../../Error/AppError.js'
import User from '../../../models/User.js'

import CreateUserService from './CreateUserService.js'

describe('Create User', () => {
  beforeEach(async () => {
    await User.sync({force: true})
  })

  it('should be able to create a new user', async () => {
    const createUser = new CreateUserService

    const user = await createUser.execute('rafa', 'rafa@gmail.com', '123123')

    const newUser = await User.findOne({
      where: {id: user.id
    }})

    expect(newUser).toHaveProperty('id')
    expect(newUser).toHaveProperty('username')
    expect(newUser.username).toEqual('rafa')
    expect(newUser.email).toEqual('rafa@gmail.com')
    expect(newUser).toBeInstanceOf(User)
  })

  it('should not be able to create a user with the same email as an existing user', async () => {
    const createUser = new CreateUserService

    await createUser.execute('rafa', 'rafa@gmail.com', '123123')

    await expect(createUser.execute('rafa', 'rafa@gmail.com', '123123')).rejects.toBeInstanceOf(AppError)
  })
})