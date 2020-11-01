'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('item', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV1
      },
      category_id: {
        allowNull: false,
        type: Sequelize.UUID,
        references: {
          model: 'category',
          key: 'id',
        }
      },
      name: {
        allowNull: false,
        type: Sequelize.STRING
      },
      created_at: Sequelize.DATE,
      updated_at: Sequelize.DATE,
    });
  },

  down: (queryInterface) => {
    return queryInterface.dropTable('item');
  }
};
