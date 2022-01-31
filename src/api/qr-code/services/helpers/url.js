const _ = require("lodash");

const isValidSlug = (slug) => {
    const FFFF = _.parseInt('FFFF', 16);
    if (slug > FFFF)
        throw new Error("Slug is greater than FFFF.")
    return true;
}

const slugCreator = (slug) => {
    try {
        isValidSlug(slug)
        const slugString = slug.toString(16).toUpperCase();
        const padding = 4
        const pad = '0'
        return _.padStart(slugString, padding, pad);
    } catch (e) {
        throw e
    }
}

const isValidUrl = (url) => {
    if (!url || url == '')
        throw new Error("No url to parse.")
    return true
}

const urlCreator = (url, slug) => {
    try {
        isValidUrl(url)
        return url + slugCreator(slug)
    }catch(e){
        throw e
    }
}

module.exports = {urlCreator, slugCreator, isValidSlug, isValidUrl}