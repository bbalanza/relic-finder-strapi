const axios = require('axios');
const fs = require("fs")
const url = require("./url")

const extractDirectory = (filePath) => {
    const pathMatcher = new RegExp(/.*\//, 'g');
    const match = pathMatcher.exec(filePath).pop();
    if(!match)
        throw new Error('Path is not valid');
    return match;
}

const saveQRCodeImageToDisk = async (filePath, imageDataBuffer) => {
    try {
        const dir = extractDirectory(filePath)
        if(!fs.existsSync(dir))
            fs.mkdirSync(dir)
        fs.writeFileSync(filePath, imageDataBuffer, 'binary')
    } catch (e) {
        throw e.message
    }
}

const deleteQRCodeImageFromDisk = async (filePath) => {
    try{
        fs.unlinkSync(filePath);
    }catch(e){
        throw e
    }
}

const getQRCodeImage = async (url) => {

    const qrCodeApiEndpoint = `https://qrcode-monkey.p.rapidapi.com/qr/custom`

    const requestOptions = {
        headers: {
            'content-type': 'application/json',
            'x-rapidapi-host': 'qrcode-monkey.p.rapidapi.com',
            'x-rapidapi-key': validateAPIKey(process.env.QR_CODE_API_KEY)
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
            logo: 'https://storage.googleapis.com/gelman-stained-glass-museum-emblem/emblem-final-01.png',
            logoMode: 'clean'
        },
        size: 1000,
        download: false,
        file: 'png'
    }
    const response = await axios.post(qrCodeApiEndpoint, requestData, requestOptions)
    return Buffer.from(response.data);
}

const validateAPIKey = (apiKey) => {
    if (apiKey && apiKey != '')
        return apiKey
    throw new Error('API Key not valid. Please set the appropriate API Key in the QR_CODE_API_KEY env variable.')
}

const setUpQRCodeUploadData = (qrCodeId) => ({ data: { refId: qrCodeId, ref: 'api::qr-code.qr-code', field: 'Image' } })
const setUpQRCodeUploadFiles = (filePath, slug) => ({ files: { path: filePath, name: url.slugCreator(slug) + '.png', type: 'image/png', size: fs.statSync(filePath).size } })

const uploadImageToStrapi = async (data, files) => {
    try {
        await strapi.service('plugin::upload.upload').upload({ ...data, ...files })
    } catch (e) {
        throw e
    }
}

const uploadQRCodeImageToStrapi = async (qrCodeId, slug, filePath) => {
    const uploadData = setUpQRCodeUploadData(qrCodeId)
    const uploadFiles = setUpQRCodeUploadFiles(filePath, slug)
    await uploadImageToStrapi(uploadData, uploadFiles)
}




module.exports = {   saveQRCodeImageToDisk, getQRCodeImage, uploadImageToStrapi, uploadQRCodeImageToStrapi, setUpQRCodeUploadData, setUpQRCodeUploadFiles, deleteQRCodeImageFromDisk, validateAPIKey, extractDirectory }