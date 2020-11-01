const GraphQLJSON = require('graphql-type-json');
const { UUID } = require('./custom-scalars');

const {
  addCategory
} = require('../controllers/category');

const {
  getTotalItems,  
  addItem
} = require('../controllers/item');

const resolvers = {
  JSON: GraphQLJSON,
  UUID,
  Query: {
    total_items: getTotalItems
  },
  Mutation: {
    add_category: addCategory,
    add_item: addItem
  }
}

module.exports = resolvers;