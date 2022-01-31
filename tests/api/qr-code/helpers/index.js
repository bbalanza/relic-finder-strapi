const lifecycleHandler = async (func) => {
    const lifecycles = strapi.db.lifecycles
    strapi.db.lifecycles.clear()
    let result = null
    try {
        result = await func();
    } catch (e) {
        throw e
    }
    strapi.db.lifecycles = lifecycles
    return result
}

const createQRCode = async (slug) =>
    await lifecycleHandler(async () =>
        await strapi.db.query('api::qr-code.qr-code').create({
            data: {
                Slug: slug
            }
        })
    )

const createQRCodes = async (slugs) =>
    await lifecycleHandler(async () =>
        await Promise.all(
            slugs.map(async slug => {
                await createQRCode(slug)
            })
        )
    )


const deleteQRCodes = async () =>
    await lifecycleHandler(async () =>
        await strapi.db.query('api::qr-code.qr-code').deleteMany()
    )


module.exports = { createQRCodes, createQRCode, deleteQRCodes }