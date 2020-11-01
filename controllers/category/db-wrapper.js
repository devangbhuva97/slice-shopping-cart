const models = require("../../models");

const getCategoryByName = (name, attributes) => {
  return models.category.findOne({
    attributes,
    where: models.sequelize.literal(`lower(name) = '${name.toLowerCase().trim()}'`),
    raw: true
  });
}

const createCategory = (dataToInsert) => {
  return models.category.create(dataToInsert);
}

module.exports = {
  getCategoryByName,
  createCategory
}