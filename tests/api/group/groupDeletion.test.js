import {createGroup, createQRCode, associateQRCodeToObject, deleteObjects} from '../helpers'

const setup = async () => {
    const group = createGroup('test')
    const qr = createQRCode("1000") 
    associateQRCodeToObject('api::group.group', group.id, qr.id)
}

const teardown = () => {
    await deleteObjects('api::qr-codes.qr-codes');
}
describe('Test groupDeletion', () => {
    it("Deletes the group's QR code when the group is deleted", async () => {
        
    })
})