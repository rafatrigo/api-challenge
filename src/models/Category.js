import Sequelize from 'sequelize';

class Category extends Sequelize.Model {
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
      }
    }, {sequelize});

    return this;
  }

  static associate(models) {
    this.belongsToMany(models.Movie, { through: 'MovieCategories', as: 'movies'});
  }
}

export default Category