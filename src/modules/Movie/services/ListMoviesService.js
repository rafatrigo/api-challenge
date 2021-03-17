import Movie from '../../../models/Movie.js'

class ListMoviesService {
  async execute() {
    const movies = await Movie.findAndCountAll()

    return movies
  }
}

export default ListMoviesService