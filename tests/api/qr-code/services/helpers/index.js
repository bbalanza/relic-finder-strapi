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

const deleteQRCodes = async (slugs) => {
    await strapi.db.query('api::qr-code.qr-code').deleteMany();
}

module.exports = { createQRCodes, deleteQRCodes }