'use strict';

/**
 * relic service.
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::relic.relic');
