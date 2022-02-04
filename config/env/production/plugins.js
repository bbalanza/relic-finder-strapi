getStoragePlugin = (env) => {
    return ({
        enabled: true,
        config: {
            provider: 'strapi-provider-upload-google-cloud-storage',
            providerOptions: {
                bucketName: env('GCP_BUCKET'),
                publicFiles: true,
                uniform: true,
                basePath: '',
            },
        }
    })
};
module.exports = ({ env }) => ({
    upload: getStoragePlugin(env),
})