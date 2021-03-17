import sequelize from 'sequelize'

import AppError from '../../../Error/AppError.js'
import Movie from '../../../models/Movie.js'

const {Op} = sequelize

class FindMoviesByName {
  async execute(title) {
    const movies = await Movie.findAndCountAll({where: {title: {
      [Op.iRegexp]: `${title}`,
    }}})

    if(!movies){
      throw new AppError('No movies found')
    }
    
    return movies
  }
}

export default FindMoviesByName