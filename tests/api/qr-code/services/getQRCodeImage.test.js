const { describe, it, expect } = require("@jest/globals");
const { getQRCodeImage } = require('api/qr-code/services/helpers')

describe('Test getsQRCodeImage', () => {
    it('Gets a QR code image based on the slug', async () => {
        const testSlug = 1
        const qrCodeImage = await getQRCodeImage(testSlug)
        expect(qrCodeImage).toEqual(Buffer.from('test data', 'binary'));
    })
})