const { describe, it, expect } = require("@jest/globals");

describe("Tests entityService.create('api::qr-code.qr-code')", () => {
    it('Creates a QR Code with the slug in the correct format', async () => {
        const qrCode = await strapi.entityService.create('api::qr-code.qr-code', {
            data: { Slug: '0000' }
        })
        expect(qrCode.Slug).toEqual('0001')
    })
})