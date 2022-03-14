'use strict';

/**
 * group service.
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::group.group', ({ strapi }) => ({
    async delete(entityId, params) {
        try {
            const paramsWithPopulate = {
                populate: ['qr_code'],
                ...params,
            }
            const result = await super.delete(entityId, paramsWithPopulate);
            await strapi.entityService.delete('api::qr-code.qr-code', result.qr_code.id)
            return result;
        } catch (e) {
            throw new Error(e.message)
        }
    }
}));
