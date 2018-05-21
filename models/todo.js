module.exports = (sequelize, DataTypes) => {
  const Todo = sequelize.define('Todo', {
    task: {
      type: DataTypes.STRING,
      allowNull: false
    },
    complete: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
  }, {});
  Todo.associate = function (models) {
    // associations can be defined here
  };
  return Todo;
}