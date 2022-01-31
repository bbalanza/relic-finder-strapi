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

module.exports = {findNewestSlug}