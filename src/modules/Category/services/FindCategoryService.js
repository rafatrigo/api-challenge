import AppError from '../../../Error/AppError.js'
import Category from '../../../models/Category.js'

class FindCategoryService {
  async execute(title){
    const category = await Category.findOne({where: {title}})

    if(!category){
      throw new AppError('Category not found')
    }

    return category
  }
}

export default FindCategoryService