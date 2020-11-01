const validator = require('validator');
const { GraphQLScalarType } = require('graphql');

const UUID = new GraphQLScalarType({
  name: 'UUID',
  description: 'UUID',
  serialize: value => value,
  parseValue: (value) => {    
    if (!validator.isUUID(value)) throw new Error('NOT_ACCEPTABLE');
    return value;
  },
  parseLiteral: (ast) => {    
    if (!validator.isUUID(ast.value)) throw new Error('NOT_ACCEPTABLE');
    return ast.value;
  }
});

module.exports = { 
  UUID
}