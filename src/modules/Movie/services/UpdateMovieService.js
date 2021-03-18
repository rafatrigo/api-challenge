import AppError from '../../../Error/AppError.js'
import Movie from '../../../models/Movie.js'

class UpdateMovieService {
  async execute(id, title, synopsis, time) {
    const movie = await Movie.findOne({
      where: {id}
    })

    if(!movie){
      throw new AppError('Movie not found')
    }

    const updatedMovie = await movie.update({title, synopsis, time})

    return (updatedMovie)
  }
}

export default UpdateMovieService