module.exports = (sequelize, DataTypes) => {
  const Category = sequelize.define(
    'category',
    {
      id: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV1
      },
      name: {
        allowNull: false,
        type: DataTypes.STRING
      },
    }
  );
  return Category;
};
