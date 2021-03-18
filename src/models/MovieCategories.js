import Sequelize from 'sequelize';

class MovieCategories extends Sequelize.Model {
  static init(sequelize) {
    super.init({
      MovieId: {
        type: Sequelize.UUID,
        primaryKey: true,
        defaultValue: Sequelize.UUIDV1,
      },
      CategoryId: {
        type: Sequelize.UUID,
        primaryKey: true,
        defaultValue: Sequelize.UUIDV1,
      },      
    }, {sequelize});

    return this;
  }
}

export default MovieCategories;