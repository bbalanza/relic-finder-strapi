import { urlCreator } from 'api/qr-code/content-types/qr-code/helpers'
import _ from 'lodash'
describe('Url Creator', () => {
    const BASE_URL = 'https://example.com/';
    it('Creates a QR Code text with the url and slug', () => {
        const url = urlCreator(BASE_URL, 31);
        expect(url).toEqual(`${BASE_URL}001F`)
    })
    it('Throws error if slug is greater than FFFF', () => {
        const invalidHexNumber = _.parseInt('10000', 16);
        expect(() => urlCreator(BASE_URL, invalidHexNumber )).toThrow();
    })
})