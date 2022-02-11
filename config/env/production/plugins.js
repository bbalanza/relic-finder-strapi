const getStoragePlugin = (env) => {
    return ({
        enabled: true,
        config: {
            provider: 'strapi-provider-upload-google-cloud-storage',
            providerOptions: {
                bucketName: env('GCP_BUCKET'),
                publicFiles: true,
                uniform: true,
                basePath: "media"
            },
        }
    })
};
const configureGraphQLPlugin = () => ({
    config: {
      endpoint: "/graphql",
      apolloServer: {
        introspection: true,
      },
    },
})
module.exports = ({ env }) => ({
    upload: getStoragePlugin(env),
    graphql: configureGraphQLPlugin(),
})