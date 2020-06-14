const jsonFile = require('jsonfile')
const file = './data/offices.json';

const data = jsonFile.readFile(file)
    .then(obj => obj)
    .catch(error => console.error(error));

module.exports.getAll = async function getAll() {
    return await data;
}

module.exports.getOne = async function getOne(id) {
    const offices = await data;
    return offices.filter(office => office.id === parseInt(id));
}