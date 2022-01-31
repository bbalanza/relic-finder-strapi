const _ = require("lodash");
const axios = require('axios');
const sharp = require('sharp')
const fs = require("fs")

const isSlugValid = (slug) => {
    const FFFF = _.parseInt('FFFF', 16);
    if (slug > FFFF)
        throw "Slug is greater than FFFF."
    return true;
}

const slugCreator = (slug) => {
    try {
        isSlugValid(slug)
        const slugString = slug.toString(16).toUpperCase();
        const padding = 4
        const pad = '0'
        return _.padStart(slugString, padding, pad);
    } catch (e) {
        throw e.message
    }
}

const isUrlValid = () => {
    if (!url || url == '')
        throw "No url to parse."
    return true
}

const urlCreator = (url, slug) => {
    try {
        isUrlValid(url)
        return url + slugCreator(slug)
    }catch(e){
        throw e.message
    }
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

const uploadQRCodeImage = async (data, files) => {
    try {
        await strapi.service('plugin::upload.upload').upload({ ...data, ...files })
    } catch (e) {
        throw e.message
    }
}

const setUpQRCodeUploadData = (qrCodeId) => ({ data: { refId: qrCodeId, ref: 'api::qr-code.qr-code', field: 'Image' } })
const setUpQRCodeUploadFiles = (filePath, slug) => ({ files: { path: filePath, name: slugCreator(slug) + '.png', type: 'image/png', size: fs.statSync(filePath).size } })

module.exports = { urlCreator, findNewestSlug, saveQRCodeImage, getQRCodeImage, uploadQRCodeImage, setUpQRCodeUploadData, setUpQRCodeUploadFiles }