import bc from 'bcryptjs';

import AppError from '../../../Error/AppError.js';
import User from '../../../models/User.js';

class UpdateUserService {
  async execute(id, username, email, password) {
    const user = await User.findOne({
      where: { id },
    });

    if (!user) {
      throw new AppError('User not found');
    }

    const emailAlreadyExits = await User.findOne({ where: { email } });

    if (emailAlreadyExits && emailAlreadyExits.id !== id) {
      throw new AppError('This email address is already in use');
    }

    const hashedPassword = await bc.hash(password, 8);

    await user.update(
      { username, email, password: hashedPassword },
      {
        where: { id },
      },
    );

    delete user.dataValues.password;

    return { user };
  }
}

export default UpdateUserService;
