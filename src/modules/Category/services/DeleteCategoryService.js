import AppError from '../../../Error/AppError.js'
import Category from '../../../models/Category.js'

class DeleteCategoryService {
  async execute(id) {
    const category = await Category.findOne({
      where: {id}
    })

    if(!category){
      throw new AppError('Category does not exist')
    }

    await Category.destroy({
      where: {id}
    })
  }
}

export default DeleteCategoryService