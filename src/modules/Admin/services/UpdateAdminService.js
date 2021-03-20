import bc from 'bcryptjs';

import AppError from '../../../Error/AppError.js';
import Admin from '../../../models/Admin.js';

class UpdateAdminService {
  async execute(id, email, password) {
    const admin = await Admin.findOne({
      where: { id },
    });

    if (!admin) {
      throw new AppError('Admin not found');
    }

    const emailAlreadyExits = await Admin.findOne({ where: { email } });

    if (emailAlreadyExits && emailAlreadyExits.id !== id) {
      throw new AppError('This email address is already in use');
    }

    const hashedPassword = await bc.hash(password, 8);

    await admin.update(
      { email, password: hashedPassword },
      {
        where: { id },
      },
    );

    delete admin.dataValues.password;

    return { admin };
  }
}

export default UpdateAdminService;
