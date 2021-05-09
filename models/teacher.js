'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Teacher extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({Course}) {
      // define association here
      this.hasMany(Course,{foreignKey:'userId',as:'course'})
    }

    toJSON() {
      return { ...this.get(), id: undefined }
    }


  };
  Teacher.init({
    uuid: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
    }
    ,
    first_name: {type:DataTypes.STRING
      ,allowNull:false},
    last_name: {type:DataTypes.STRING
      ,allowNull:false},
    date_of_birth: {type:DataTypes.STRING
      ,allowNull:false}
  }, {
    sequelize,
    tableName:'teacher',
    modelName: 'Teacher',
  });
  return Teacher;
};