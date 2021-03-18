import Sequelize from 'sequelize';

class UserWatchedMovies extends Sequelize.Model {
  static init(sequelize) {
    super.init({
      MovieId: {
        type: Sequelize.UUID,
        primaryKey: true,
        defaultValue: Sequelize.UUIDV1,
      },
      UserId: {
        type: Sequelize.UUID,
        primaryKey: true,
        defaultValue: Sequelize.UUIDV1,
      },      
    }, {sequelize});

    return this;
  }
}

export default UserWatchedMovies;