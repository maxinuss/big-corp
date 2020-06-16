const _ = require('lodash');

/**
 *
 * @param data
 * @param limit
 * @param offset
 * @returns {any[]|*}
 */
module.exports.paginate = (data, limit, offset) => {
    if (limit === 0 && offset === 0)
        return data;

    const dataClone = _.cloneDeep(data);

    return dataClone.splice(offset, limit);
};

/**
 *
 * @param entities
 * @param expand
 * @param targetEntity
 * @returns {*}
 */
module.exports.getRelations = function getRelations(entities, expand, targetEntity) {
    const path = expand.split('.');
    const immutableEntity = _.cloneDeep(entities);

    return expandAll(path, entities, targetEntity, immutableEntity);
}

/**
 *
 * @param field
 * @param entities
 * @param targetEntity
 * @param immutableEntity
 * @returns {*}
 */
const expand = (field, entities, targetEntity, immutableEntity) => {
    return targetEntity.map((entity, i) => {
        if (entity[field] === null) {
            return entity;
        }

        console.log('entity', entity);
        return {...entity, [field]: entities.find(({id}) => id === immutableEntity[i][field])}
    });
}

/**
 *
 * @param field
 * @param fields
 * @param entities
 * @param targetEntity
 * @param immutableEntity
 * @returns {*}
 */
const expandAll = ([field, ...fields], entities, targetEntity, immutableEntity) => {
    if(field === undefined) {
        return entities
    }

    if (fields.length > 0) {
        return expandAll(fields, expand(field, entities, targetEntity, immutableEntity), targetEntity, immutableEntity)
    }

    return expand(field, entities, targetEntity, immutableEntity)
}
