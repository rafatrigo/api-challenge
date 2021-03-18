import 'babel-polyfill'
import '../../../database/index.js'

import Movie from '../../../models/Movie.js'

import CreateMovieService from './CreateMovieService.js'
import FindMoviesByTitle from './FindMoviesByTitleService.js'

describe('Find movies by title', () => {
  beforeEach(async () => {
    await Movie.sync({force: true})
  })

  it('should be able to find movies by title', async () => {
    const createMovie = new CreateMovieService
    const findByTitle = new FindMoviesByTitle

    await createMovie.execute('movie Title', 'synopsis', 90)
    await createMovie.execute('movie Title 2', 'synopsis', 90)

    const moviesFound = await findByTitle.execute('Title')

    expect(moviesFound.count).toEqual(2)
    expect(moviesFound.rows[0].title).toEqual('movie Title')
    expect(moviesFound.rows[1].title).toEqual('movie Title 2')
  })

  it('should not show any movie if the title is not found', async () => {
    const findByTitle = new FindMoviesByTitle

    const movieFound = await findByTitle.execute('Title')

    expect(movieFound.count).toEqual(0)
  })
})