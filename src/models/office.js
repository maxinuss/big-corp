const modelUtils = require('../utils/modelUtils');
const jsonFile = require('jsonfile')
const file = './data/offices.json';

const data = jsonFile.readFile(file)
    .then(obj => obj)
    .catch(error => console.error(error));

/**
 *
 * @param limit
 * @param offset
 * @returns {Promise<*[]|*>}
 */
module.exports.getAll = async function getAll(limit = 0, offset = 0) {
    return modelUtils.paginate(await data, limit, offset);
}

/**
 *
 * @param id
 * @returns {Promise<*>}
 */
module.exports.getOne = async function getOne(id) {
    const offices = await data;
    return offices.filter(office => office.id === parseInt(id));
}