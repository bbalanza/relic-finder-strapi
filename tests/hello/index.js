const request = require('supertest');
const { grantPrivilege } = require("./../helpers/strapi");

beforeAll(async () => {
//   await grantPrivilege(2, "permissions.application.controllers.hello.index");  // Gives Public access to endpoint
});

it('should return hello world', async () => {
  await request(strapi.server.httpServer) 
    .get('/api/hello')
    .expect(200) // Expect response http code 200
});