import AppError from '../../../Error/AppError.js'

import Movie from '../../../models/Movie.js'
import Category from '../../../models/Category.js'

class AddCategoryService {
  async execute(id, categoryTitle){
    const movie = await Movie.findOne({where: {id}})
    
    if(!movie){
      throw new AppError('This movie does not exists')
    }
    
    const category = await Category.findOne({where: {title: categoryTitle}})

    if(!category){
      throw new AppError('This category does not exists')
    }

    const movieWithCategory = await movie.addCategories(category)

    return movieWithCategory
  }
}

export default AddCategoryService