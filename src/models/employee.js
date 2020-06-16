const modelUtils = require('../utils/modelUtils');
const axios = require('axios').default;
const apiURL = process.env.EMPLOYEES_API_URL;
const MAX_LIMIT = process.env.MAX_LIMIT;

/**
 *
 * @param limit
 * @param offset
 * @param expand
 * @returns {Promise<*[]|*>}
 */
module.exports.getAll = async function getAll(limit = 0, offset = 0, expand = null) {
    try {
        let response = await axios.get(apiURL, {
            params: {
                limit,
                offset
            }
        });

        if (expand) {
            const relationsData = await getDataToFillRelations(response.data);
            response = modelUtils.getRelations(relationsData, expand, relationsData);

            return modelUtils.paginate(response, limit, offset);
        }

        return response.data;
    } catch (e) {
        console.log('HTTP error: ', e);
    }
}

/**
 *
 * @param id
 * @returns {Promise<*>}
 */
module.exports.getOne = async function getOne(id) {
    try {
        let response = await axios.get(apiURL);
        return response.data.filter(employee => employee.id === parseInt(id));
    } catch (e) {
        console.log('HTTP Error: ', e);
    }
}

/**
 *
 * @param data
 * @returns {Promise<[]>}
 */
const getDataToFillRelations = async data => {
    let limit = getUserMaxId(data);
    let result = [];

    try {
        while (limit > 0) {
            let response = await axios.get(apiURL, {
                params: {
                    limit,
                    offset: 0
                }
            });

            result = [ ...result, ...response.data];
            limit = limit <= MAX_LIMIT ? 0 : limit - MAX_LIMIT;
        }

        return result;
    } catch (e) {
        console.log('HTTP error: ', e);
    }
}

/**
 *
 * @param data
 * @returns {*}
 */
const getUserMaxId = data => data.pop().id;