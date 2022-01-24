import _ from "lodash"
const urlCreator = (url, slug) => {
    const slugString = parseInt(slug, 16)
    return url + _.padStart(slugString, 4, '0');
}

export { urlCreator }