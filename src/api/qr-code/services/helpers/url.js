const _ = require("lodash");

const isValidRelicSlug = (slug) => {
    const FFFF = _.parseInt('FFFF', 16);
    if (slug > FFFF)
        throw new Error("Slug is greater than FFFF.")
    return true;
}

const slugCreator = (slug) => {
    try {
        if (isRelicSlug(slug)) {
            intSlug = convertSlugStringToInt(slug)
            isValidRelicSlug(intSlug)
            return convertIntSlugToString(intSlug)
        }
        if (isGroupSlug(slug)){
            return replaceWhitespaces(slug).toLowerCase()
        }
    } catch (e) {
        throw e
    }
}

const replaceWhitespaces = (string) => {
    return string.replace(/\ /g, "-")
}

const convertSlugStringToInt = (slug) => {
    return _.parseInt(slug, 16)
}

const convertIntSlugToString = (slug) => {
    const slugString = slug.toString(16).toUpperCase();
    const padding = 4
    const pad = '0'
    return _.padStart(slugString, padding, pad);
}

const isValidURL = (url) => {
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
        isValidURL(url)
        return url + slugCreator(slug)
    } catch (e) {
        throw e
    }
}

module.exports = { urlCreator, slugCreator, isValidRelicSlug, isValidURL, isRelicSlug, isGroupSlug, convertSlugStringToInt, convertIntSlugToString, replaceWhitespaces }