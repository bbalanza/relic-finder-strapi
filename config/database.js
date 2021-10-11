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
  connections: env("NODE_ENV") === 'development' ? getDevConnections(env) : getProdConnections(env), 
});
