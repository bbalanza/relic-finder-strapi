import '../production/plugins'

module.exports = ({ env }) => ({
  defaultConnection: 'default',
  connections: getProdConnections(env), 
});
