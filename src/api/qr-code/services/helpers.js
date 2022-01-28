const _ = require("lodash");
const axios = require('axios');
const sharp = require('sharp')
const fs = require("fs")

const urlCreator = (url, slug) => {
    const slugString = slug.toString(16).toUpperCase();
    if (slug > _.parseInt('FFFF', 16))
        throw "Slug is created than FFFF."
    if (!url || url == '')
        throw "No url to parse."
    return url + _.padStart(slugString, 4, '0');
}

const findNewestSlug = async () => {
    const qrCodesBySlug = await strapi.entityService.findMany('api::qr-code.qr-code', {
        sort: { Slug: 'DESC' }
    })
    if (qrCodesBySlug.length != 0) {
        const slug = qrCodesBySlug[0].Slug
        return slug
    }
    return -1;
}

const saveQRCodeImage = async (filePath, imageData) => {
    try {
        fs.writeFileSync(filePath, imageData, 'binary')
    } catch (e) {
        throw new Error(e.message)
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
            body: 'rounded-pointed',
            eye: 'frame14',
            eyeBall: 'ball16',
            erf1: [],
            erf2: ['fh'],
            erf3: ['fv'],
            brf1: [],
            brf2: ['fh'],
            brf3: ['fv'],
            bodyColor: '#5C8B29',
            bgColor: '#FFFFFF',
            eye1Color: '#3F6B2B',
            eye2Color: '#3F6B2B',
            eye3Color: '#3F6B2B',
            eyeBall1Color: '#60A541',
            eyeBall2Color: '#60A541',
            eyeBall3Color: '#60A541',
            gradientColor1: '#5C8B29',
            gradientColor2: '#25492F',
            gradientType: 'radial',
            gradientOnEyes: false,
            logo: ''
        },
        size: 300,
        download: false,
        file: 'png'
    }

    const response = await axios.post(qrCodeApiEndpoint, requestData, requestOptions)
    return Buffer.from(response.data);
    
}

const uploadQRCodeImage = async (data, files) => {
    try{
    await strapi.service('plugin::upload.upload').upload({ ...data, ...files })
    }catch(e){
        throw e.message
    }
}

const setUpQRCodeUploadData = (qrCodeId) => ({data: {refId: qrCodeId, ref: 'qr-code', field: 'Image' }})
const setUpQRCodeUploadFiles = (filePath, slug) => ({files: {path: filePath, name: slug.toString() + '.png', type: 'image/png', size: fs.statSync(filePath).size}})

module.exports = { urlCreator, findNewestSlug, saveQRCodeImage, getQRCodeImage, uploadQRCodeImage, setUpQRCodeUploadData, setUpQRCodeUploadFiles }