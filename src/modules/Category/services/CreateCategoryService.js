import AppError from '../../../Error/AppError.js'
import Category from '../../../models/Category.js'

class CreateCategoryService {
  async execute(title){
    const category = await Category.findOne({where: {title}})

    if(category){
      throw new AppError('This category already exists')
    }

    const newCategory = await Category.create({title})

    return newCategory
  }
}

export default CreateCategoryService