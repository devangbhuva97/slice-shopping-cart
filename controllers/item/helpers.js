
const validateItem = (name) => {
  const errors = [];

  if (name.length > 100) errors.push('Item name must be less than 100 characters');

  const isValid = errors.length === 0;

  return { isValid, errors };
}

module.exports = {
  validateItem
}