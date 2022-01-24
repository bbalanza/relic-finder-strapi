const Strapi = require("@strapi/strapi");
const http = require("http");

let instance;

async function setupStrapi() {
  if (!instance) {
    await Strapi().load();
    instance = strapi;
    await instance.server.mount();
  }
  return instance;
}

module.exports = { setupStrapi };
