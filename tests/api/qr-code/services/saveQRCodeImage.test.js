const { describe, it, expect } = require('@jest/globals')
const { saveQRCodeImageToDisk } = require('api/qr-code/services/helpers')
const fs = require('fs')

describe('Test saveQRCodeImageToDisk', () => {
    it('Saves the QR Code Image binary data as a file in .tmp', async () => {
        const binaryQRImage = 'test';
        const filePath = './.tmp/test.txt'
        await saveQRCodeImageToDisk(filePath, binaryQRImage)
        expect(fs.existsSync(filePath)).toBeTruthy()
        fs.unlinkSync(filePath)
    })
})