const createQRCode = async (slug) => {
    return await strapi.db.query('api::qr-code.qr-code').create({
        data: {
            Slug: slug
        }
    })
}
const createQRCodes = async (slugs) => {
    await Promise.all(
        slugs.map(async slug => {
            await createQRCode(slug)
        })
    )
}

const deleteQRCodes = async () => {
    await strapi.db.query('api::qr-code.qr-code').deleteMany();

}

module.exports = { createQRCodes, createQRCode, deleteQRCodes }