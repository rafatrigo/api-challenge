'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('UserWatchedMovies', {
      MovieId: {
        type: Sequelize.UUID,
        primaryKey: true
      },
      UserId: {
        type: Sequelize.UUID,
        primaryKey: true
      },
      createdAt: Sequelize.DATE,
      updatedAt: Sequelize.DATE,
    })

    await queryInterface.createTable('UserMoviesToWatch', {
      MovieId: {
        type: Sequelize.UUID,
        primaryKey: true
      },
      UserId: {
        type: Sequelize.UUID,
        primaryKey: true
      },
      createdAt: Sequelize.DATE,
      updatedAt: Sequelize.DATE,
    })
  },

  down: async (queryInterface, Sequelize) => {
    queryInterface.dropTable('UserMoviesToWatch')
    queryInterface.dropTable('UserWatchedMovies')
  }
};
