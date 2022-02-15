const { describe, it, expect } = require("@jest/globals");
const { getQRCodeImage, saveQRCodeImageToDisk, uploadImageToStrapi , deleteQRCodeImageFromDisk, validateAPIKey, extractDirectory } = require('api/qr-code/services/helpers')
const fs = require('fs')
const helpers = require("../../helpers/index")

const IMAGE_FILE_PATH = './tests/static/test.png';
const NONEXISTENT_PATH = '.test/'
const TEXT_FILE_PATH = './tests/static/test.txt';
const NONEXISTENT_IMAGE_FILE_PATH = NONEXISTENT_PATH + 'static/test.png'
const TEST_IMAGE_NAME = 'test.png'
const BINARY_FILE_CONTENT = 'test';

describe('Test extractDirectory', () => {
    it('Extracts the path from a directory', () => {
        const dir = ".tmp/test/anotherTest/"
        const file = "56.png"
        const filePath = dir + file
        expect(extractDirectory(filePath)).toEqual(dir)
    })
})

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
        await saveQRCodeImageToDisk(TEXT_FILE_PATH, BINARY_FILE_CONTENT);
        expect(fs.existsSync(TEXT_FILE_PATH)).toBeTruthy();
        fs.unlinkSync(TEXT_FILE_PATH);
    })
    it('Creates path if it is not available', async () => {
        await saveQRCodeImageToDisk(NONEXISTENT_IMAGE_FILE_PATH, BINARY_FILE_CONTENT);
        expect(fs.existsSync(NONEXISTENT_IMAGE_FILE_PATH)).toBeTruthy()
        fs.rmdirSync(NONEXISTENT_PATH, {recursive: true});

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

describe('Test validateAPIKey', () => {
    it('Throws if invalid API key is given', () => {
        const errorMessage = 'API Key not valid. Please set the appropriate API Key in the QR_CODE_API_KEY env variable.';
        expect(() => validateAPIKey(null)).toThrow(errorMessage);
        expect(() => validateAPIKey('')).toThrow(errorMessage);
    })
    it('Returns the API key if it is valid', () => {
        const testAPIKey = 'test';
        expect(validateAPIKey(testAPIKey)).toEqual(testAPIKey)
    })
})