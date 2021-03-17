import AppError from '../../../Error/AppError.js'
import Movie from '../../../models/Movie.js'
import User from '../../../models/User.js'

class AddToWatchedListService {
  async execute(movieId, userId) {
    const movie = await Movie.findOne({where: {id: movieId}})

    if(!movie){
      throw new AppError('Movie not found')
    }

    const user = await User.findOne({where: {id: userId}})

    await user.removeToWatch(movie)
    await user.addWatched(movie)
  }
} 

export default AddToWatchedListService