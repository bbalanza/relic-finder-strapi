const {convertSlugStringToInt, convertIntSlugToString} = require('./url')

const findNewestSlug = async () => {

    const qrCodesBySlug = await strapi.entityService.findMany('api::qr-code.qr-code', {
        sort: { Slug: 'DESC' }
    })

    if (qrCodesBySlug.length != 0) {
        const slug = qrCodesBySlug[0].Slug
        return convertSlugStringToInt(slug)
    }
    return -1;
}

const calculateNewSlug = async () => {
    const newestSlug = await findNewestSlug();
    let newSlug = newestSlug + 1;
    const areQRCodesEmpty = newSlug == 0;

    if (areQRCodesEmpty) {
        newSlug = newSlug + 1;
    }
    return convertIntSlugToString(newSlug);
}

module.exports = {findNewestSlug, calculateNewSlug}