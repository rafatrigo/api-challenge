import 'babel-polyfill'
import '../../../database/index.js'

import AppError from '../../../Error/AppError.js'
import User from '../../../models/User.js'

import CreateUserService from './CreateUserService.js'
import DeleteUserService from './DeleteUserService.js'

describe('Delete User', () => {
  beforeEach(async () => {
    await User.sync({force: true})
  })

  it('should be able to delete a user', async () => {
    const deleteUser = new DeleteUserService
    const createUser = new CreateUserService

    const user = await createUser.execute('rafa', 'rafa@gmail.com', '123123')
    await deleteUser.execute(user.id)

    const deletedUser = await User.findOne({
      where: {id: user.id
    }})

    expect(deletedUser).toEqual(null)
  })

  it('should throw an error if the user id is invalid', async () => {
    const createUser = new CreateUserService
    const deleteUser = new DeleteUserService

    await createUser.execute('rafa', 'rafa@gmail.com', '123123')

    const invalidId = '9ed03170-86bc-11eb-a913-25eaac83e057'

    await expect(deleteUser.execute(invalidId)).rejects.toBeInstanceOf(AppError)
  })
})