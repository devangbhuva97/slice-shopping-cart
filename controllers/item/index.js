const { validateItem } = require('./helpers');
const DBWrapper = require('./db-wrapper');
const logger = require('../../libs/logger');

const getTotalItems = async (_, args, context) => {

  logger.info('Item - getTotalItems', 'Request', { args, context });

  try {
    
    const totalItems = await DBWrapper.getItemCount();

    return totalItems;

  } catch (error) {

    logger.error('Item - getTotalItems', 'Error', { args, context, error });
    
    throw new Error('Something went wrong!');

  }
}

const addItem = async (_, args, context) => {

  logger.info('Item - addItem', 'Request', { args, context });

  const response = { success: false, message: 'Something went wrong!' };

  try {

    const { category_id, name } = args.data;

    const { isValid, errors} = validateItem(name);
    if (!isValid) return { ...response, message: 'Invalid inputs!', errors };

    const category = await DBWrapper.getCategoryByID(category_id, ['id']);
    if (!category) return { ...response, message: 'Invalid category.' };

    const hasAlreadyItem = await DBWrapper.getItemByName(name, ['id']);
    if (hasAlreadyItem) return { ...response, message: 'Already have same item.' };

    const createdItem = await DBWrapper.createItem({ category_id, name: name.trim() });

    return { success: true, message: 'Item added successfully.', data: createdItem };

  } catch (error) {

    logger.error('Item - addItem', 'Error', { args, context, error });

    return response

  }
}

module.exports = {
  getTotalItems,
  addItem
}