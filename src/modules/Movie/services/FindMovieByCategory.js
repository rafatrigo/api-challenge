import AppError from '../../../Error/AppError.js'
import Category from '../../../models/Category.js'

class FindMoviesByCategory {
  async execute(categoryTitle) {
    const category = await Category.findOne({
      where: {title: categoryTitle},
      include: 'movies'
    })

    if(!category){
      throw new AppError('Category not found')
    }

    return category.movies
  }
}

export default FindMoviesByCategory