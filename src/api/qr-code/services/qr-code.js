'use strict';

/**
 * qr-code service.
 */

const { createCoreService } = require('@strapi/strapi').factories;
const _ = require("lodash");

const urlCreator = (url, slug) => {
    const slugString = slug.toString(16).toUpperCase();
    if (slug > _.parseInt('FFFF', 16))
        throw "Slug is created than FFFF."
    return url + _.padStart(slugString, 4, '0');
}

const findNewestSlug = async () => {
    const qrCodesBySlug = await strapi.entityService.findMany('api::qr-code.qr-code', {
        sort: { Slug: 'DESC' }
    })
    if (qrCodesBySlug.length != 0) {
        const slug = qrCodesBySlug[0].Slug
        return slug
    }
    return -1;
}

const calculateNewSlug = async () => {
   const newestSlug = findNewestSlug();
   return newestSlug + 1; 
}

module.exports = createCoreService('api::qr-code.qr-code', ({ strapi }) => ({
    urlCreator,
    findNewestSlug,
    calculateNewSlug
}));
