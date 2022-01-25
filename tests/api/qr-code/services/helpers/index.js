const createQRCodes = async (slugs) => {
    await Promise.all(
        slugs.map(async slug => {
            await strapi.entityService.create('api::qr-code.qr-code', {
                data: {
                    Slug: slug
                }
            })
        })
    )
}

module.exports = {createQRCodes}