module.exports = {
    async beforeCreate(event) {
        const title = event.params.data.Title
        const qrCode = await strapi.entityService.create('api::qr-code.qr-code', {
            data: { Slug: title }
        })
        event.params.data.qr_code = qrCode.id
    },
    async beforeDelete(event) {
        await strapi.db.query('api::qr-code.qr-code').delete({
            where: {
                group: event.params.where.id
            },
            populate: ['group']
        })
    },
}