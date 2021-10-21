getProdConnections = (env) => {
return {
    default: {
      connector: 'bookshelf',
      settings: {
        client: 'postgres',
        host: `/cloudsql/${env('INSTANCE_CONNECTION_NAME')}`,
        database: env('DATABASE_NAME'),
        username: env('DATABASE_USERNAME'),
        password: env('DATABASE_PASSWORD'),
      },
      options: {},
    },
  }
}

module.exports = ({ env }) => ({
  defaultConnection: 'default',
  connections: getProdConnections(env), 
});