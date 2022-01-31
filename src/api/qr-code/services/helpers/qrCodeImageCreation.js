const axios = require('axios');
const fs = require("fs")

const saveQRCodeImageToDisk = async (filePath, imageDataBuffer) => {
    try {
        fs.writeFileSync(filePath, imageDataBuffer, 'binary')
    } catch (e) {
        throw e.message
    }
}

const getQRCodeImage = async (url) => {

    const qrCodeApiEndpoint = `https://qrcode-monkey.p.rapidapi.com/qr/custom`

    const requestOptions = {
        headers: {
            'content-type': 'application/json',
            'x-rapidapi-host': 'qrcode-monkey.p.rapidapi.com',
            'x-rapidapi-key': process.env.QR_CODE_API_KEY
        },
        responseType: 'arraybuffer',
        responseEncoding: 'binary'
    }
    const requestData = {
        data: url,
        config: {
            body: 'circular',
            eye: 'frame0',
            eyeBall: 'ball0',
            bodyColor: '#000000',
            bgColor: '#FFFFFF',
            logo: 'https://storage.googleapis.com/gelman-stained-glass-museum-emblem/emblem-final-01.png'
        },
        size: 500,
        download: false,
        file: 'png'
    }
    const response = await axios.post(qrCodeApiEndpoint, requestData, requestOptions)
    return Buffer.from(response.data);
}

const uploadQRCodeImageToStrapi = async (data, files) => {
    try {
        await strapi.service('plugin::upload.upload').upload({ ...data, ...files })
    } catch (e) {
        throw e.message
    }
}

const setUpQRCodeUploadData = (qrCodeId) => ({ data: { refId: qrCodeId, ref: 'api::qr-code.qr-code', field: 'Image' } })
const setUpQRCodeUploadFiles = (filePath, slug) => ({ files: { path: filePath, name: slugCreator(slug) + '.png', type: 'image/png', size: fs.statSync(filePath).size } })

module.exports = {   saveQRCodeImageToDisk, getQRCodeImage, uploadQRCodeImageToStrapi, setUpQRCodeUploadData, setUpQRCodeUploadFiles }