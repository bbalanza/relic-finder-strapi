getStoragePlugin = ({env}) => {
return ({
        provider: 'google-cloud-storage',
        providerOptions: {
            bucketName: env('GCP_BUCKET'),
            publicFiles: true,
            uniform: true,
            basePath: '',
        },
    })
};
module.exports = ({env}) => ({
    upload: getStoragePlugin(env),
})