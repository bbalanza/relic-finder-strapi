const Strapi = require("@strapi/strapi");
const fs = require("fs");

let instance;

async function setupStrapi() {
  if (!instance) {
    await Strapi().load();
    instance = strapi;
    await instance.server.mount();
  }
  return instance;
}

async function cleanupStrapi() {
  const dbSettings = strapi.config.get("database.connection");
  const tmpDbFile = dbSettings.connection.filename

  //close server to release the db-file
  await strapi.server.httpServer.close();

  //delete test database after all tests
  if (dbSettings && tmpDbFile) {
    if (fs.existsSync(tmpDbFile)) {
      fs.unlinkSync(tmpDbFile);
    }
  }
  // close the connection to the database
  await strapi.db.connection.destroy();

}

module.exports = { setupStrapi, cleanupStrapi };
