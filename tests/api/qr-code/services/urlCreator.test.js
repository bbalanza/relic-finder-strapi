const { describe, it, expect } = require('@jest/globals')
const { urlCreator } = require('api/qr-code/services/helpers')

const _ = require('lodash')
describe('Test urlCreator', () => {
    const BASE_URL = 'https://example.com/';
    it('Creates a QR Code text with the url and slug', () => {
        const url = urlCreator(BASE_URL, 31);
        expect(url).toEqual(`${BASE_URL}001F`)
    })
    it('Throws error if slug is greater than FFFF', () => {
        const invalidHexNumber = _.parseInt('10000', 16);
        expect(() => urlCreator(BASE_URL, invalidHexNumber)).toThrow('Slug is created than FFFF.');
    })
})