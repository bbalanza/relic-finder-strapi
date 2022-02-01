const { result } = require("lodash");

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

const getQRCodeBySlug = async (slug) =>
    await lifecycleHandler(async () => {
        const qrCodeList = await strapi.entityService.findMany('api::qr-code.qr-code', {
            filters: { Slug: slug },
            populate: '*',
        })
        return qrCodeList.pop()
    })

const createRelic = async (slug) =>
    await lifecycleHandler(async () =>
        await strapi.db.query('api::relic.relic').create({
            data: {
                Title: 'Test',
            }
        })
    )

const associateQRCodeToRelic = async (relicId, qrCodeId) => 
    await lifecycleHandler(async () =>
        await strapi.entityService.update('api::relic.relic', relicId, {
            data: {
                qr_code: qrCodeId
            },
            populate: '*'
        })
    )



module.exports = { createQRCodes, createQRCode, deleteQRCodes, associateQRCodeToRelic, getQRCodeBySlug, createRelic }