getDevConnections = (env) => {
return {
    default: {
      connector: 'bookshelf',
      settings: {
        client: 'sqlite',
        filename: env('DATABASE_FILENAME', '.tmp/data.db'),
      },
      options: {
        useNullAsDefault: true,
      },
    },
  }
}

module.exports = ({ env }) => ({
  defaultConnection: 'default',
  connections:  getDevConnections(env),
});
