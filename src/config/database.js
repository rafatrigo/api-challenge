require('dotenv/config.js');

module.exports = {
  dev: {
    dialect: 'postgres',
    host: 'localhost',
    username: 'postgres',
    password: 'docker',
    database: 'api-challenge',
    define: {
      timestamps: true,
    },
  },
  test: {
    dialect: 'postgres',
    port: 5433,
    host: 'localhost',
    username: 'postgres',
    password: 'docker',
    database: 'api-challenge-test',
    define: {
      timestamps: true,
    },
  },
  build: {
    dialect: 'postgres',
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    define: {
      timestamps: true,
    },
  },
};
