import AppError from '../../../Error/AppError.js'
import User from '../../../models/User.js'


class DeleteUserService {
  async execute(id) {
    const user = await User.findOne({
      where: {id}
    })

    if(!user){
      throw new AppError('User does not exist')
    }

    await User.destroy({
      where: {id}
    })
  }
}

export default DeleteUserService