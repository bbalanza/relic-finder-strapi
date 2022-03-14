const { expect } = require('@jest/globals')
const { createGroup, createQRCode, associateQRCodeToObject, deleteObjects } = require('../helpers')

const GROUP_UID = 'api::group.group';
const QR_UID = 'api::qr-code.qr-code';

const setup = async () => {
    const group = await createGroup('test');
    const qr = await createQRCode("test");
    await associateQRCodeToObject(GROUP_UID, group.id, qr.id);
    return {group, qr};
}

const teardown = async () => {
    await deleteObjects(GROUP_UID);
    await deleteObjects(QR_UID);
}

describe('Test groupDeletion', () => {
    it("Deletes the group's QR code when the group is deleted", async () => {
        const {group, qr} = await setup() 
        const result = await strapi.entityService.delete(GROUP_UID, group.id)
        expect(await strapi.entityService.findOne(QR_UID, qr.id)).toBeFalsy()
        await teardown()
    })
})