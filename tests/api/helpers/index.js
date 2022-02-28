const { createLifecyclesProvider } = require("@strapi/database/lib/lifecycles");

const lifecycleHandler = async (func) => {
    strapi.db.lifecycles.clear()
    let result = null
    try {
        result = await func();
    } catch (e) {
        throw e
    }
    strapi.db.lifecycles = createLifecyclesProvider(strapi.db)
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
const deleteRelics = async () =>
    await lifecycleHandler(async () =>
        await strapi.db.query('api::relic.relic').deleteMany()
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

const createRelics = async (slugs) =>
    await lifecycleHandler(async () =>
        await Promise.all(
            slugs.map(async slug =>
                await createRelic(slug)
            )
        )
    )
const createGroup = async (title) =>
    await lifecycleHandler(async () =>
        await strapi.db.query('api::group.group').create({
            data: {
                Title: title
            }
        })
    )

const createGroups = async (titles) =>
    await lifecycleHandler(async () =>
        await Promise.all(
            titles.map(async title =>
                await createGroup(title)
            )
        )
    )


const associateQRCodeToObject = async (uid, objectId, qrCodeId) =>
    await lifecycleHandler(async () =>
        await strapi.entityService.update(uid, objectId, {
            data: {
                qr_code: qrCodeId
            },
            populate: '*'
        })
    )



module.exports = { createQRCodes, createQRCode, deleteQRCodes, associateQRCodeToObject, getQRCodeBySlug, createRelic, createRelics, deleteRelics, createGroup, createGroups}