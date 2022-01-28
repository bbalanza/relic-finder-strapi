'use strict';

/**
 * relic service.
 */

// TODO: Find QR Codes without a relic
// TODO: Associate a QR Code to a Relic

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::relic.relic');
