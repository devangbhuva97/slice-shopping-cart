const { validateCategory } = require('./helpers');
const DBWrapper = require('./db-wrapper');
const logger = require('../../libs/logger');

const addCategory = async (_, args, context) => {

  logger.info('Category - addCategory', 'Request', { args, context });

  const response = { success: false, message: 'Something went wrong!' };

  try {

    const { name } = args.data;

    const { isValid, errors } = validateCategory(name);
    if (!isValid) return { ...response, message: 'Invalid inputs!', errors };

    const hasAlreadyCategory = await DBWrapper.getCategoryByName(name, ['id']);
    if (hasAlreadyCategory) return { ...response, message: 'Already have same category.' };

    const createdCategory = await DBWrapper.createCategory({ name: name.trim() });

    return { success: true, message: 'Category added successfully.', data: createdCategory };

  } catch (error) {

    logger.error('Category - addCategory', 'Error', { args, context, error });

    return response;

  }

}

module.exports = {
  addCategory
}