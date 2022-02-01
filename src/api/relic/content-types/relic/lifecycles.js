module.exports = {
    async beforeCreate(event) {
        let qrCode = null;
        qrCode = await strapi.service('api::qr-code.qr-code').findAvailableQRCode();
        if (!qrCode)
            qrCode = await strapi.entityService.create('api::qr-code.qr-code', {
                data: {Slug: 0}
            })
        event.params.data.qr_code = qrCode.id 
    }
}