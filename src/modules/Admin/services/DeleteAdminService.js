import AppError from '../../../Error/AppError.js';
import Admin from '../../../models/Admin.js';

class DeleteAdminService {
  async execute(id) {
    const admin = await Admin.findOne({
      where: { id },
    });

    if (!admin) {
      throw new AppError('Admin does not exist');
    }

    await Admin.destroy({
      where: { id },
    });
  }
}

export default DeleteAdminService;
