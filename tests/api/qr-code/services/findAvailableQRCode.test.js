const { describe, it, expect, } = require("@jest/globals");
const helpers = require('../../helpers')

let qrCodes
let relics

const setup = async () => {
    await helpers.createQRCodes(["0001", "0002"]);
    qrCodes = [await helpers.getQRCodeBySlug("0001"), await helpers.getQRCodeBySlug("0002")]
    relics = [await helpers.createRelic(), await helpers.createRelic()]
    await helpers.associateQRCodeToRelic(relics[0].id, qrCodes[0].id)

}

const teardown = async () => {
    await helpers.deleteQRCodes()
    await helpers.deleteRelics()
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
        await helpers.associateQRCodeToRelic(relics[1].id, qrCodes[1].id)
        const availableQRCode = await strapi.service('api::qr-code.qr-code').findAvailableQRCode()
        await teardown()
        expect(availableQRCode).toEqual(null)
    })
    it('Returns null on an empty list', async () => {
        const availableQRCode = await strapi.service('api::qr-code.qr-code').findAvailableQRCode()
        expect(availableQRCode).toEqual(null)
    })
})