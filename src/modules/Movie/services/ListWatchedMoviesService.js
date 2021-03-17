import User from '../../../models/User.js'

class ListWatchedMoviesService {
  async execute(id) {
    const user = await User.findOne({where: {id}})
    const movies = await user.getWatched()

    return movies
  }
}

export default ListWatchedMoviesService