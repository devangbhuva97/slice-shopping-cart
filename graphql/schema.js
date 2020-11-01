const { gql } = require("apollo-server-express");

const typeDefs = gql`

  scalar JSON
  scalar UUID

  type Query {
    total_items: Int!
  }

  type MutationResponse {
    success: Boolean!
    message: String!
    data: JSON
    errors: [String!]
  }

  input AddCategoryInput {
    name: String!
  }

  input AddItemInput {
    category_id: UUID!
    name: String!
  }

  type Mutation {
    add_category(data: AddCategoryInput!): MutationResponse
    add_item(data: AddItemInput!): MutationResponse
  }

`

module.exports = typeDefs;