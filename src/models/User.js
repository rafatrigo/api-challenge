import Sequelize from 'sequelize';

class User extends Sequelize.Model {
  static init(sequelize) {
    super.init(
      {
        id: {
          type: Sequelize.UUID,
          primaryKey: true,
          defaultValue: Sequelize.UUIDV1,
        },
        username: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        email: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        password: {
          type: Sequelize.STRING,
          allowNull: false,
        },
      },
      { sequelize },
    );

    return this;
  }

  static associate(models) {
    this.belongsToMany(models.Movie, {
      through: 'UserWatchedMovies',
      as: 'watched',
    });
    this.belongsToMany(models.Movie, {
      through: 'UserMoviesToWatch',
      as: 'toWatch',
    });
  }
}

export default User;
