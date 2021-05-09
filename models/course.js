'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Course extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({Teacher}) {
      // define association here
      this.belongsTo(Teacher,{foreignKey:'userId',as:'teacher'})
    }

    toJSON() {
      return { ...this.get(), id: undefined,userId:undefined }
    }
  };
  Course.init({
    uuid:{
      type:DataTypes.UUID,
      defaultValue:DataTypes.UUIDV4
    }
    ,
    course_name: {type:DataTypes.STRING
    ,allowNull:false},

    course_description: {
      type:DataTypes.STRING
      ,allowNull:false}
  }, {
    sequelize,
    tableName:'course',
    modelName: 'Course',
  });
  return Course;
};