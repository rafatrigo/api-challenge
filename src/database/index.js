import Sequelize from 'sequelize';

import databaseConfig from '../config/database.cjs';

import Movie from '../models/Movie.js';
import Category from '../models/Category.js';
import User from '../models/User.js'
import Admin from '../models/Admin.js'

import MovieCategories from '../models/MovieCategories.js';
import UserMoviesToWatch from '../models/UserMoviesToWatch.js'
import UserWatchedMovies from '../models/UserWatchedMovies.js'

const models = [
  Movie,
  Category,
  User,
  MovieCategories,
  UserMoviesToWatch,
  UserWatchedMovies,
  Admin
]

export function connect(){
  return process.env.NODE_ENV === 'test' ? 
    new Sequelize(databaseConfig.test) : 
    new Sequelize(databaseConfig.dev)
}

class Database {
  constructor() {
    this.init();
  }

  init() {
    
    this.connection = connect()

    models
      .map(model => model.init(this.connection))
      .map(model => model.associate && model.associate(this.connection.models));
  }

}

try {
  const db = connect()
  
  db.authenticate()
  console.log('🔗 Database connected')
  
} catch (err) {
  console.log('❌ Database connection failed')
}

export default new Database();