import AppError from '../../../Error/AppError.js'
import Category from '../../../models/Category.js'

class UpdateCategoryService {
  async execute(id, title) {
    const category = await Category.findOne({
      where: {id}
    })

    if(!category){
      throw new AppError('Category not found')
    }

    await category.update({title})
    
    return {title}
  }
}

export default UpdateCategoryService