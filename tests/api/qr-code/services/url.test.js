const { describe, it, expect } = require('@jest/globals')
const { urlCreator, isValidSlug, isValidUrl } = require('api/qr-code/services/helpers')

const _ = require('lodash')
const BASE_URL = 'https://example.com/';
const SLUG = 1

describe('Test isValidSlug', () => {
    const validSlug = 1;
    const invalidLargeSlug = 41203948123;
    it('Returns true if it is a valid slug', () => {
        expect(isValidSlug(validSlug)).toEqual(true)
    })
    it('Throws if slug is invalid', () => {
        expect(() => isValidSlug(invalidLargeSlug)).toThrow('Slug is greater than FFFF.')
    })
})

describe('Test isValidUrl', () => {
    const validUrl = 'https://gelmanmuseum.org'
    const invalidNullUrl = null;
    const invalidEmptyUrl = '';
    it('Returns true if it is a valid url', () => {
        expect(isValidUrl(validUrl)).toEqual(true)
    })
    it("Throws if url isn't valid", () => {
        expect(() => isValidUrl(invalidNullUrl)).toThrow()   
        expect(() => isValidUrl(invalidEmptyUrl)).toThrow()   
    })
})

describe('Test urlCreator', () => {
    it('Creates a QR Code text with the url and slug', () => {
        const url = urlCreator(BASE_URL, 31);
        expect(url).toEqual(`${BASE_URL}001F`)
    })
    it('Throws error if slug is greater than FFFF', () => {
        const invalidHexNumber = _.parseInt('10000', 16);
        expect(() => urlCreator(BASE_URL, invalidHexNumber)).toThrow('Slug is greater than FFFF.');
    })
})