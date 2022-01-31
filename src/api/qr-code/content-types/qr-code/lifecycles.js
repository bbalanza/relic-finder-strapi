
const BASE_URL = 'https://relic-finder.gelmanmuseum.org/'

module.exports = {
    async beforeCreate(event) {
        const slug = await strapi.service('api::qr-code.qr-code').calculateNewSlug();
        event.params.data.Slug = slug;
    },
    async afterCreate(event) {
        const { result } = event;
        const id = result.id;
        const slug = result.Slug;
        await strapi.service('api::qr-code.qr-code').setQRCodeImage(id, slug, BASE_URL)
    },
}