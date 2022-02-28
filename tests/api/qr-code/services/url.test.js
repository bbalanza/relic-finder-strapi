const { describe, it, expect } = require('@jest/globals')
const { urlCreator, isValidRelicSlug, isValidURL, isRelicSlug, isGroupSlug, convertSlugStringToInt, replaceWhitespaces} = require('api/qr-code/services/helpers')

const _ = require('lodash');
const BASE_URL = 'https://example.com/';
const RELIC_SLUG = '001F'
const GROUP_SLUG = 'tiffany'

describe('Test isValidRelicSlug', () => {
    const validSlug = 1;
    const invalidLargeSlug = 41203948123;
    it('Returns true if it is a valid relic slug', () => {
        expect(isValidRelicSlug(validSlug)).toEqual(true)
    })
    it('Throws if relic slug is invalid', () => {
        expect(() => isValidRelicSlug(invalidLargeSlug)).toThrow('Slug is greater than FFFF.')
    })
})

describe('Test isValidURL', () => {
    const validUrl = 'https://gelmanmuseum.org'
    const invalidNullUrl = null;
    const invalidEmptyUrl = '';
    it('Returns true if it is a valid url', () => {
        expect(isValidURL(validUrl)).toEqual(true)
    })
    it("Throws if url isn't valid", () => {
        expect(() => isValidURL(invalidNullUrl)).toThrow()
        expect(() => isValidURL(invalidEmptyUrl)).toThrow()
    })
})

describe('Test urlCreator', () => {
    it('Creates a QR Code text with the url and slug', () => {
        const url = urlCreator(BASE_URL, RELIC_SLUG);
        expect(url).toEqual(`${BASE_URL}001F`)
    })
    it('Throws error if slug is greater than FFFF', () => {
        const invalidHexNumber = _.parseInt('10000', RELIC_SLUG);
        expect(() => urlCreator(BASE_URL, invalidHexNumber)).toThrow('Slug is greater than FFFF.');
    })
})

describe('Test isRelicSlug', () => {
    it('Returns true if the url is a relic slug', () => {
        expect(isRelicSlug(RELIC_SLUG)).toEqual(true)
    })
    it('Returns false if it is not a relic slug', () => {
        expect(isRelicSlug(GROUP_SLUG)).toEqual(false)
    })
})

describe('Test isGroupSlug', () => {
    it('Returns true if the url is a group slug', () => {
        expect(isGroupSlug(GROUP_SLUG)).toEqual(true)
    })
    it('Returns false if it is not a group slug', () => {
        expect(isGroupSlug(RELIC_SLUG)).toEqual(false)
    }
    )
})

describe('Test convertStringSlugToInt', () => {
    it('Returns the correct int', () => {
        expect(convertSlugStringToInt(RELIC_SLUG)).toEqual(31)
    })
})

describe('Test replaceWhitespaces', () => 
    it('Correctly replaces whitespaces with hyphens', () => {
        expect(replaceWhitespaces('tiffany windows')).toEqual('tiffany-windows')
    })
)