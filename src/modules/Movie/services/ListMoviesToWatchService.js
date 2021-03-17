import User from '../../../models/User.js'

class ListMoviesToWatchService {
  async execute(id) {
    const user = await User.findOne({where: {id}})
    const movies = await user.getToWatch()

    return movies
  }
}

export default ListMoviesToWatchService