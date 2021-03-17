import AppError from '../../../Error/AppError.js'
import Movie from '../../../models/Movie.js'

class DeleteMovieService {
  async execute(id) {
    const movie = await Movie.findOne({
      where: {id}
    })

    if(!movie){
      throw new AppError('Movie not found')
    }

    await Movie.destroy({
      where: {id}
    })
  }
}

export default DeleteMovieService