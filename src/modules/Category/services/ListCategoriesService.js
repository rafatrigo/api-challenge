import Category from '../../../models/Category.js'

class ListCategoriesService {
  async execute() {
    const categories = Category.findAll({include: 'movies'})

    return categories
  }
}

export default ListCategoriesService