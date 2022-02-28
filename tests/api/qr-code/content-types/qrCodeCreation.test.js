const { describe, it, expect } = require("@jest/globals");
const helpers = require("../../helpers")

describe("Tests entityService.create('api::qr-code.qr-code')", () => {
    it('Creates a QR Code with the slug in the correct format', async () => {
        const qrCode = await strapi.entityService.create('api::qr-code.qr-code', {
            data: { Slug: '0001' }
        })
        expect(qrCode.Slug).toEqual('0001')
    })
})