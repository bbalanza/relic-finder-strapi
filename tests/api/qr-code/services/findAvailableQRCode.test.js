const { describe, it, expect, } = require("@jest/globals");
const helpers = require('../../helpers')

let qrCodes
let relics
let group

const setup = async () => {
    await helpers.createQRCodes(["0001", "0002", "0003"]);
    qrCodes = [await helpers.getQRCodeBySlug("0001"), await helpers.getQRCodeBySlug("0002"), await helpers.getQRCodeBySlug("0003")]
    relics = [await helpers.createRelic(), await helpers.createRelic()]
    await helpers.associateQRCodeToObject('api::relic.relic', relics[0].id, qrCodes[0].id)
    group = await helpers.createGroup('test');
    await helpers.associateQRCodeToObject('api::group.group',group.id, qrCodes[2])

}

const teardown = async () => {
    await helpers.deleteObjects('api::qr-code.qr-code')
    await helpers.deleteObjects('api::relic.relic')
    relics = null
    qrCodes = null
}

describe('Test findAvailableQRCode', () => {
    it('Finds available QR Code', async () => {
        await setup()
        const availableQRCode = await strapi.service('api::qr-code.qr-code').findAvailableQRCode()
        await teardown()
        expect(availableQRCode.Slug).toEqual("0002")
    })
    it('Returns null if no relics are found', async () => {
        await setup()
        await helpers.associateQRCodeToObject('api::relic.relic', relics[1].id, qrCodes[1].id)
        const availableQRCode = await strapi.service('api::qr-code.qr-code').findAvailableQRCode()
        await teardown()
        expect(availableQRCode).toEqual(null)
    })
    it('Returns null on an empty list', async () => {
        const availableQRCode = await strapi.service('api::qr-code.qr-code').findAvailableQRCode()
        expect(availableQRCode).toEqual(null)
    })
})