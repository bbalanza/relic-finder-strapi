
const BASE_URL = 'https://relic-finder.gelmanmuseum.org/'
// DONE: Find latest slug
// DONE: Set the slug to the greates slug plus 1
// DONE: Create URL from slug
// DONE: Make axios API call and create URL
// DONE: Save QR image in Strapi Media Library

module.exports = {
    // async beforeCreate(event) {
    //    const slug = await strapi.service('api::qr-code.qr-code').calculateNewSlug();
    //    event.params.data.Slug = slug;  
    // },
    // async afterCreate(event) {
    //     const {result} = event;
    //     const id = result.id;
    //     const slug = result.Slug;
    //     await strapi.service('api::qr-code.qr-code').createQRCodeImage(id, slug)
    // },
}