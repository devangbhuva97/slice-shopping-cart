require('dotenv').config();

const fs = require('fs');
const path = require('path');
const { Sequelize, DataTypes } = require('sequelize');
const config = require('../config');

const basename = path.basename(module.filename);
const models = {};

const { database, username, password, ...restDBConfig } = config.db;

const sequelize = new Sequelize(database, username, password, {
  ...restDBConfig,
  define: {
    underscored: true,
    charset: 'utf8',
    timestamps: true,
    paranoid: false,
    freezeTableName: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
  },
});

fs
  .readdirSync(__dirname)
  .filter(file => (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js'))
  .forEach((file) => {
    const model = require(path.join(__dirname, file))(sequelize, DataTypes);
    models[model.name] = model;
  });

Object.keys(models).forEach(modelName => {
  if ('associate' in models[modelName]) {
    models[modelName].associate(models);
  }
});

models.sequelize = sequelize;

module.exports = models;
