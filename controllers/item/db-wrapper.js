const models = require("../../models");

const getItemCount = () => {
  return models.item.count();
}

const getCategoryByID = (id, attributes) => {
  return models.category.findOne({
    attributes,
    where: { id },
    raw: true
  });
}

const getItemByName = (name, attributes) => {
  return models.item.findOne({
    attributes,
    where: models.sequelize.literal(`lower(name) = '${name.toLowerCase().trim()}'`),
    raw: true
  });
}

const createItem = (dataToInsert) => {
  return models.item.create(dataToInsert);
}

module.exports = {
  getItemCount,
  getCategoryByID,
  getItemByName,
  createItem
}