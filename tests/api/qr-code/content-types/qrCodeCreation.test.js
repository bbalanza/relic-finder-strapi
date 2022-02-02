const { describe, it, expect } = require("@jest/globals");
const helpers = require("../../helpers")

describe('Tests Slug (String) creation upon creating a QR Code', () => {
    it('Creates a slug string from slug integer', async () => {
        const qrCode = await strapi.entityService.create('api::qr-code.qr-code', {
            data: { Slug: 1 }
        })
        expect(qrCode.Slug_Name).toEqual('0001')
    })
})