'use strict';

const helpers = require('./helpers');

const { createCoreService } = require('@strapi/strapi').factories;

const calculateNewSlug = async () => {
    const newestSlug = await helpers.findNewestSlug();
    const newSlug = newestSlug + 1;
    const areQRCodesEmpty = newSlug == 0;

    if (areQRCodesEmpty) {
        return newSlug + 1;
    }
    return newSlug;
}

const setQRCodeImage = async (qrCodeId, slug, baseUrl) => {
    try {
        const url = helpers.urlCreator(baseUrl, slug)
        const binaryQRImage = await helpers.getQRCodeImage(url)
        const filePath = '.tmp/' + slug + '.png'

        await helpers.saveQRCodeImageToDisk(filePath, binaryQRImage)
        await helpers.uploadQRCodeImageToStrapi(qrCodeId, slug, filePath);
        await helpers.deleteQRCodeImageFromDisk(filePath)

    } catch (e) {
        throw e.message
    }
}
const findAvailableQRCode = async () => {
    const availableQRCodes = await strapi.entityService.findMany('api::qr-code.qr-code', {
        sort: { Slug: 'DESC' },
        populate: { relic: true },
        filters: { relic: null }
    })

    if (availableQRCodes.length != 0)
        return availableQRCodes.pop()

    return null
}

module.exports = createCoreService('api::qr-code.qr-code', ({ strapi }) => ({
    calculateNewSlug,
    findAvailableQRCode,
    setQRCodeImage,
}));
