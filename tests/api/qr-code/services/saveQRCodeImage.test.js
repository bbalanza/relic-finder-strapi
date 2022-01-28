const { describe, it, expect, afterEach } = require('@jest/globals')
const { saveQRCodeImage } = require('api/qr-code/services/helpers')
const fs = require('fs')

describe('Test saveQRCodeImage', () => {
    it('Saves the QR Code Image binary data as a file in .tmp', async () => {
        const binaryQRImage = 'test';
        const filePath = './.tmp/test.txt'
        await saveQRCodeImage(filePath, binaryQRImage)
        expect(fs.existsSync(filePath)).toBeTruthy()
        fs.unlinkSync(filePath)
    })
})