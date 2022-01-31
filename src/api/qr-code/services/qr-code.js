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

const setQRCodeImage = async (qrCodeId, slug) => {
    try {
        const baseUrl = 'https://relic-finder.gelmanmuseum.org/'
        const url = helpers.urlCreator(baseUrl, slug)
        const binaryQRImage = await helpers.getQRCodeImage(url)
        const filepath = '.tmp/' + slug + '.png'
        await helpers.saveQRCodeImage(filepath, binaryQRImage)

        const uploadData = helpers.setUpQRCodeUploadData(qrCodeId)
        const uploadFiles = helpers.setUpQRCodeUploadFiles(filepath, slug)

        await helpers.uploadQRCodeImage(uploadData, uploadFiles)
    } catch (e) {
        console.log(e.message)
    }

}


module.exports = createCoreService('api::qr-code.qr-code', ({ strapi }) => ({
    calculateNewSlug,
    setQRCodeImage,
}));
