const { describe, it, expect, afterEach } = require('@jest/globals')
const { createQRCode, createQRCodes, deleteQRCodes, associateQRCodeToObject, createGroup } = require('../../helpers')
const { findNewestSlug, convertIntSlugToString, calculateNewSlug } = require('api/qr-code/services/helpers')
const SLUGS = [0, 1, 2, 3, 4, 5]
const LAST_SLUG = SLUGS[SLUGS.length - 1]

afterEach(async () => {
    await deleteQRCodes();
})
describe('Test findNewestSlug', () => {
    it('Returns the largest slug', async () => {
        await createQRCodes(SLUGS);
        const groupQRCode = await createQRCode("sample group");
        const group = await createGroup("test")
        await associateQRCodeToObject('api::group.group', group.id, groupQRCode.id)
        const newestSlug = await findNewestSlug();
        await deleteQRCodes();
        expect(newestSlug).toEqual(LAST_SLUG)
    })
    it('Returns -1 if there are no QR Codes created', async () => {
        const newestSlug = await findNewestSlug();
        expect(newestSlug).toEqual(-1)
    })
})

describe('Test calculateNewSlug', () => {
    it('Returns the proper slug', async () => {
        await createQRCodes(SLUGS);
        const newSlug = await calculateNewSlug();
        const correctNewSlug = LAST_SLUG + 1;
        expect(newSlug).toEqual(convertIntSlugToString(correctNewSlug))
        await deleteQRCodes();
    })
    it('Creates a slug of 0001 if there are no QR codes', async () => {
        const newSlug = await calculateNewSlug();
        expect(newSlug).toEqual('0001')
    })
})