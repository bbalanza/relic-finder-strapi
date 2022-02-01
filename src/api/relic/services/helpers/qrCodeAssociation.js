const findAvailableQRCode = async () => {
    const freeQRCodes = await strapi.entityService.findMany('api::qr-code.qr-code', {
        sort: { Slug: 'DESC' }
    })

    if (freeQRCodes.length != 0)
        return freeQRCodes.pop()

    return null
}

const associateQRCodeToRelic = async (relicId, qrCodeId) =>
    await strapi.entityService.update('api::relic.relic', relicId, {
        data: {
            qr_code: qrCodeId
        },
        populate: '*'
    })

module.exports ={findAvailableQRCode}