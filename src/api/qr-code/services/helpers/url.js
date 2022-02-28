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
        return convertSlugToString(slug)
    } catch (e) {
        throw e
    }
}

const convertSlugToString = (slug) => {
    const slugString = slug.toString(16).toUpperCase();
    const padding = 4
    const pad = '0'
    return _.padStart(slugString, padding, pad);
}

const isSlugEmpty = (url) => {
    if (!url || url == '')
        throw new Error("No url to parse.")
    return true
}

const isRelicSlug = (slug) => {
    relicRegex = RegExp(/[0-9 A-F]{4}/, 'g')
    return relicRegex.test(slug.toString());
}

const isGroupSlug = (slug) => {
    groupRegex = RegExp(/([a-z A-Z -])\w+/, 'g')
    return groupRegex.test(slug)
}

const urlCreator = (url, slug) => {
    try {
        isSlugEmpty(url)
        return url + slugCreator(slug)
    } catch (e) {
        throw e
    }
}

module.exports = { urlCreator, slugCreator, isValidSlug, isSlugEmpty, isRelicSlug, isGroupSlug }