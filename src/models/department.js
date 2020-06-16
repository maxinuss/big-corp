const modelUtils = require('../utils/modelUtils');
const jsonFile = require('jsonfile')
const file = './data/departments.json';

const data = jsonFile.readFile(file)
    .then(obj => obj)
    .catch(error => console.error(error));

/**
 *
 * @param limit
 * @param offset
 * @param expand
 * @returns {Promise<*[]|*>}
 */
module.exports.getAll = async function getAll(limit = 0, offset = 0, expand = null) {
    let response = await data;

    if (expand) {
        response = modelUtils.getRelations(response, expand, response);
    }

    return modelUtils.paginate(response, limit, offset);
}

/**
 *
 * @param id
 * @returns {Promise<*>}
 */
module.exports.getOne = async function getOne(id) {
    const departments = await data;
    return departments.filter(department => department.id === parseInt(id));
}