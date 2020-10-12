'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Todo extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Todo.init({
    name: {
      allowNull: false,
      type: DataTypes.STRING
    },
    complete: {
      allowNull: false,
      defaultValue: false,
      type: DataTypes.BOOLEAN
    },
    priority: {
      allowNull: false,
      defaultValue: 0,
      type: DataTypes.INTEGER
    },
   }, {
    sequelize,
    modelName: 'Todo',
  });
  return Todo;
};