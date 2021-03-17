import Sequelize from 'sequelize';

class Movie extends Sequelize.Model {
  static init(sequelize) {
    super.init({
      id: {
        type: Sequelize.UUID,
        primaryKey: true,
        defaultValue: Sequelize.UUIDV1,
      },
      title: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      synopsis: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      time: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },      
    }, {sequelize});

    return this;
  }

  static associate(models) {
    this.belongsToMany(models.Category, { through: 'MovieCategories', as: 'categories'});
    this.belongsToMany(models.User, { through: 'UserWatchedMovies', as: 'watched'});
    this.belongsToMany(models.User, { through: 'UserMovesToWatch', as: 'toWatch'});
  }
}

export default Movie;