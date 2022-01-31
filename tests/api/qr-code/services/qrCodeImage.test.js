const { describe, it, expect } = require("@jest/globals");
const { getQRCodeImage, saveQRCodeImageToDisk, uploadImageToStrapi , deleteQRCodeImageFromDisk} = require('api/qr-code/services/helpers')
const fs = require('fs')
const helpers = require("../helpers/index")

const IMAGE_FILE_PATH = './.tmp/test.png';
const TEXT_FILE_PATH = './.tmp/test.txt';
const TEST_IMAGE_NAME = 'test.png'
const BINARY_FILE_CONTENT = 'test';

describe('Tests deleteQRCodeImageLocally', () => {
    it('Deletes the temporary file', async () => {
        await saveQRCodeImageToDisk(TEXT_FILE_PATH, BINARY_FILE_CONTENT)
        await deleteQRCodeImageFromDisk(TEXT_FILE_PATH)
        expect( fs.existsSync(TEXT_FILE_PATH)).toEqual(false)
    })
})

describe('Test getsQRCodeImage', () => {
    it('Gets a QR code image based on the slug', async () => {
        const testSlug = 1
        const qrCodeImage = await getQRCodeImage(testSlug)
        expect(qrCodeImage).toEqual(Buffer.from('test data', 'binary'));
    })
})

describe('Test saveQRCodeImageToDisk', () => {
    it('Saves the QR Code Image binary data as a file in .tmp', async () => {
        await saveQRCodeImageToDisk(TEXT_FILE_PATH, BINARY_FILE_CONTENT)
        expect(fs.existsSync(TEXT_FILE_PATH)).toBeTruthy()
        fs.unlinkSync(TEXT_FILE_PATH)
    })
})

describe('Tests uploadImageToStrapi', () => {
    it('Uploads a QR Code Image to the Strapi Backend', async () => {
        let qrCode = await helpers.createQRCode(1)
        const qrCodeId = qrCode.id

        const data = {
            data: {
                refId: qrCodeId,
                ref: 'api::qr-code.qr-code',
                field: 'Image',
            }
        }

        const files = {
            files: {
                path: IMAGE_FILE_PATH,
                name: TEST_IMAGE_NAME,
                type: 'image/png', // mime type
                size: fs.statSync(IMAGE_FILE_PATH).size,
            }
        }

        await uploadImageToStrapi(data, files)
        qrCode = (await strapi.entityService.findMany('api::qr-code.qr-code', {
            populate: { Image: true }
        })).pop()
        expect(qrCode.Image.name).toEqual(TEST_IMAGE_NAME)
    })
})