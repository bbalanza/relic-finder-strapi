const _ = require('lodash')
const { createQRCodes } = require('./helpers')

const SLUGS = [0, 1, 2, 3, 4, 5]

describe('Url Creator', () => {
    const BASE_URL = 'https://example.com/';
    it('Creates a QR Code text with the url and slug', () => {
        const url = strapi.service('api::qr-code.qr-code').urlCreator(BASE_URL, 31);
        expect(url).toEqual(`${BASE_URL}001F`)
    })
    it('Throws error if slug is greater than FFFF', () => {
        const invalidHexNumber = _.parseInt('10000', 16);
        expect(() => strapi.service('api::qr-code.qr-code').urlCreator(BASE_URL, invalidHexNumber)).toThrow('Slug is created than FFFF.');
    })
})

describe('Test findNewestSlug', () => {
    it('Returns the largest slug', async () => {
        await createQRCodes(SLUGS);
        const newestSlug = await strapi.service('api::qr-code.qr-code').findNewestSlug();
        const lastSlug = SLUGS[SLUGS.length - 1]
        expect(newestSlug).toEqual(lastSlug)
    })
})