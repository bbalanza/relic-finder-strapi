const associateQRCodeToRelic = async (relicId, qrCodeId) =>
    await strapi.entityService.update('api::relic.relic', relicId, {
        data: {
            qr_code: qrCodeId
        },
    })

module.exports = { associateQRCodeToRelic }