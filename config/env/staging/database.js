import "../production/database"

module.exports = ({ env }) => ({
  defaultConnection: 'default',
  connections: getProdConnections(env), 
});
