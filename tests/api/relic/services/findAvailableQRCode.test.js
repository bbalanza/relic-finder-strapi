const { describe, it, expect } = require("@jest/globals");
const helpers = require('../../helpers')
const {findAvailableQRCode} = require('api/relic/services/helpers')

describe('Test findAvailableQRCode', () => {
    it('Finds available QR Code', async () => {
        await helpers.createQRCodes([1,2,3]);
        const qrCodes = [await helpers.getQRCodeBySlug(2), await helpers.getQRCodeBySlug(3)]
        const relic = await helpers.createRelic()
        await helpers.associateQRCodeToRelic(relic.id, qrCodes[0].id)
        await helpers.associateQRCodeToRelic(relic.id, qrCodes[1].id)

        const availableQRCode = await findAvailableQRCode()
        expect(availableQRCode.Slug).toEqual(1)
    })
})