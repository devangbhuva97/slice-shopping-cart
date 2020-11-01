module.exports = (sequelize, DataTypes) => {
  const Item = sequelize.define(
    'item',
    {
      id: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV1
      },
      category_id: {
        allowNull: false,
        type: DataTypes.UUID,
        references: {
          model: 'category',
          key: 'id',
        }
      },
      name: {
        allowNull: false,
        type: DataTypes.STRING
      },
    }
  );
  return Item;
};
