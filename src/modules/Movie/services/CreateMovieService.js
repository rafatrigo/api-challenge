import AppError from '../../../Error/AppError.js';
import Movie from '../../../models/Movie.js';

class CreateMovieService {
  async execute(title, synopsis, time) {
    const movie = await Movie.findOne({
      where: { title },
    });

    if (movie) {
      throw new AppError('The movie already exists');
    }

    const newMovie = await Movie.create({ title, synopsis, time });

    delete newMovie.dataValues.createdAt;
    delete newMovie.dataValues.updatedAt;

    return newMovie;
  }
}

export default CreateMovieService;
