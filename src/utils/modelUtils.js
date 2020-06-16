const _ = require('lodash');

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
