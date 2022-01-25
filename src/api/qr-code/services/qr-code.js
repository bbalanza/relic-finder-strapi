'use strict';

/**
 * qr-code service.
 */

const { createCoreService } = require('@strapi/strapi').factories;
const _ = require("lodash");

const urlCreator = (url, slug) => {
    const slugString = slug.toString(16).toUpperCase();
    if (slug > _.parseInt('FFFF', 16))
        throw "Slug is created than FFFF;"
    return url + _.padStart(slugString, 4, '0');
}

module.exports = createCoreService('api::qr-code.qr-code', ({ strapi }) => ({
    urlCreator(url, slug) {
        const slugString = slug.toString(16).toUpperCase();
        if (slug > _.parseInt('FFFF', 16))
            throw "Slug is created than FFFF;"
        return url + _.padStart(slugString, 4, '0');
    },
}));
