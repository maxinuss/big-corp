const modelUtils = require('../utils/modelUtils');
const jsonFile = require('jsonfile')
const file = './data/departments.json';

const data = jsonFile.readFile(file)
    .then(obj => obj)
    .catch(error => console.error(error));

module.exports.getAll = async function getAll(expand = null) {
    let response = await data;

    if (expand) {
        response = modelUtils.getRelations(response, expand, response);
    }

    return response;
}

module.exports.getOne = async function getOne(id) {
    const departments = await data;
    return departments.filter(department => department.id === parseInt(id));
}