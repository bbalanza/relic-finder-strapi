const { setupStrapi, cleanupStrapi } = require("./helpers/strapi");

jest.setTimeout(15000);

beforeAll(async () => {
  await setupStrapi(); 
});

afterAll(async () => {
 await cleanupStrapi();
});

it("strapi is defined", () => {
  expect(strapi).toBeDefined();
});

require('./api/qr-code/services/index.test')
