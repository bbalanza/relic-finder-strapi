const getProductionConnection = (env) => ({
    client: 'postgres',
    connection: {
        host: `/cloudsql/${env('INSTANCE_CONNECTION_NAME')}`,
        database: env('DATABASE_NAME'),
        user: env('DATABASE_USERNAME'),
        password: env('DATABASE_PASSWORD'),
        ssl: env('DATABASE_SSL', false)
    },
    debug: false,
    pool: {
        min: 0,
        max: 22,
    }
})

module.exports = ({ env }) => ({
    defaultConnection: 'default',
    connection: getProductionConnection(env),
})