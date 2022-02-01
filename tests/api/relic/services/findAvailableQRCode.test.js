const { describe, it, expect, beforeAll, afterAll } = require("@jest/globals");
const helpers = require('../../helpers')
const { findAvailableQRCode } = require('api/relic/services/helpers')

let qrCodes
let relics

const setup = async () => {
    await helpers.createQRCodes([1, 2, 3]);
    qrCodes = [await helpers.getQRCodeBySlug(1), await helpers.getQRCodeBySlug(2), await helpers.getQRCodeBySlug(3)]
    relics = [await helpers.createRelic(), await helpers.createRelic(), await helpers.createRelic()]
    await helpers.associateQRCodeToRelic(relics[1].id, qrCodes[1].id)
    await helpers.associateQRCodeToRelic(relics[2].id, qrCodes[2].id)

}

const teardown = async () => {
    await helpers.deleteQRCodes()
    await helpers.deleteRelics()
    relic = null
    qrCodes = null
}

describe('Test findAvailableQRCode', () => {
    it('Finds available QR Code', async () => {
        await setup()
        const availableQRCode = await findAvailableQRCode()
        await teardown()
        expect(availableQRCode.Slug).toEqual(1)
    })
    it('Returns null if no relics are found', async () => {
        await setup()
        await helpers.associateQRCodeToRelic(relics[0].id, qrCodes[0].id)
        const availableQRCode = await findAvailableQRCode()
        await teardown()
        expect(availableQRCode).toEqual(null)
    })
})