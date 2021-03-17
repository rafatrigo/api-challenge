import Sequelize from 'sequelize';

import databaseConfig from '../config/database.cjs';

import Movie from '../models/Movie.js';
import Category from '../models/Category.js';
import User from '../models/User.js'

const models = [Movie, Category, User];

class Database {
  constructor() {
    this.init();
  }

  init() {
    this.connection = new Sequelize(databaseConfig);

    models
      .map(model => model.init(this.connection))
      .map(model => model.associate && model.associate(this.connection.models));
  }

}

try {

  const db = new Sequelize(databaseConfig)
  await db.authenticate()
  console.log('🔗 Database connected')
  
} catch (err) {
  console.log('❌ Database connection failed')
}

export default new Database();