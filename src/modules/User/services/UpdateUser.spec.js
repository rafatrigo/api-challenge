import 'babel-polyfill'
import '../../../database/index.js'

import bc from 'bcryptjs'

import AppError from '../../../Error/AppError.js'
import User from '../../../models/User.js'

import CreateUserService from './CreateUserService.js'
import UpdateUserService from './UpdateUserService.js'

describe('Update User', () => {
  beforeEach(async () => {
    await User.sync({force: true})
  })

  it('should be able to update a user', async () => {
    const updateUser = new UpdateUserService
    const createUser = new CreateUserService

    const user = await createUser.execute('rafa', 'rafa@gmail.com', '123123')
    await updateUser.execute(user.id, 'rafael', 'rafael@gmail.com', '123456')

    const updatedUser = await User.findOne({
      where: {id: user.id
    }})

    const comparePassword = await bc.compare('123456', updatedUser.password)

    expect(updatedUser).toHaveProperty('id')
    expect(updatedUser).toHaveProperty('username')
    expect(updatedUser.username).toEqual('rafael')
    expect(updatedUser.email).toEqual('rafael@gmail.com')
    expect(comparePassword).toBe(true)
    expect(updatedUser).toBeInstanceOf(User)
  })

  it('should throw an error if the user id is invalid', async () => {
    const createUser = new CreateUserService
    const updateUser = new UpdateUserService

    await createUser.execute('rafa', 'rafa@gmail.com', '123123')

    const invalidId = '9ed03170-86bc-11eb-a913-25eaac83e057'

    await expect(updateUser.execute(invalidId, 'rafael', 'rafael@gmail.com', '123456')).rejects.toBeInstanceOf(AppError)
  })
  
  it('should not be possible to update the user email to an existing email other than his', async () => {
    const createUser = new CreateUserService
    const updateUser = new UpdateUserService

    const user = await createUser.execute('rafa', 'rafa@gmail.com', '123123')
    await createUser.execute('rafael2', 'rafa2@gmail.com', '123123')

    await expect(updateUser.execute(user.id, 'rafael', 'rafa2@gmail.com', '123456')).rejects.toBeInstanceOf(AppError)
  })
})