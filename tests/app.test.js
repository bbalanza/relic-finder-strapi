const fs = require("fs");
const { setupStrapi } = require("./helpers/strapi");
jest.setTimeout(15000);
beforeAll(async () => {
  await setupStrapi(); 
});

afterAll(async () => {
  const dbSettings = strapi.config.get("database.connections.default.settings");

  //close server to release the db-file
  await strapi.server.httpServer.close();
  //delete test database after all tests
  if (dbSettings && dbSettings.filename) {
    const tmpDbFile = `${__dirname}/../${dbSettings.filename}`;
    if (fs.existsSync(tmpDbFile)) {
      fs.unlinkSync(tmpDbFile);
    }
  }
  // await strapi.db.connection.destroy();
});

it("strapi is defined", () => {
  expect(strapi).toBeDefined();
});
