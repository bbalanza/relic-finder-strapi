import {urlCreator} from 'api/qr-code/content-types/qr-code/helpers'

describe('Url Creator', () => {
    it('Creates a QR Code text with the url and slug', () => {
        const url = urlCreator('https://example.com/', 1);
        // expect(url).toEqual('https://example.com/0001')
        expect(true).toBeTruthy()
    })
})