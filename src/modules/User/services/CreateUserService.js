import AppError from '../../../Error/AppError.js';
import User from '../../../models/User.js';

import bc from 'bcryptjs';

class CreateUserService {
  async execute(username, email, password) {
    const user = await User.findOne({ where: { email } });

    if (user) {
      throw new AppError('The email adress alredy exists');
    }

    const hashedPassword = await bc.hash(password, 8);

    const newUser = await User.create({
      username,
      email,
      password: hashedPassword,
    });

    delete newUser.dataValues.password;
    delete newUser.dataValues.createdAt;
    delete newUser.dataValues.updatedAt;

    return newUser;
  }
}

export default CreateUserService;
