// This is a new file for solution!
import { Model } from 'sequelize'

const loadModel = (sequelize, DataTypes) => {
  class Performance extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate (models) {
      // TO-DO: define association here
    }
  }

  /* {Performance.init(
    // TO-DO
    // Here's the model definition
  }) */

  return Performance
}

export default loadModel
