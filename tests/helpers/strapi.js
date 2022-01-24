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

const grantPrivilege = async (
  roleID = 1,
  value,
  enabled = true,
  policy = ""
) => {
  const updateObj = value
    .match(/[a-zA-Z-]+[^.|^[\]']/gm)
    .reduceRight((obj, next) => ({ [next]: obj }), { enabled, policy });
  console.log()
  return strapi.services["plugin::users-permissions.role"].updateRole(roleID, updateObj);
};

module.exports = { setupStrapi, grantPrivilege };
