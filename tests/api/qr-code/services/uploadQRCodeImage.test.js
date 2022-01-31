const { describe, it, expect } = require("@jest/globals");
const { uploadQRCodeImage } = require("api/qr-code/services/helpers")
const fs = require('fs')
const helpers = require("./helpers/index")

const FILE_PATH = './.tmp/test.png';
const TEST_IMAGE_NAME= 'test.png'




describe('Tests uploadQRCodeImage', () => {
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
                path: FILE_PATH,
                name: TEST_IMAGE_NAME,
                type: 'image/png', // mime type
                size: fs.statSync(FILE_PATH).size,
            }
        }

        await uploadQRCodeImage(data, files)
        qrCode = (await strapi.entityService.findMany('api::qr-code.qr-code', {
            populate: {Image: true}
        })).pop()
        expect(qrCode.Image.name).toEqual(TEST_IMAGE_NAME)
    })
})