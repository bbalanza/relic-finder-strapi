getStoragePlugin = ({env}) => {
return ({
        provider: 'google-cloud-storage',
        providerOptions: {
            bucketName: `relic-finder-${env(_ENVIRONMENT)}-media`,
            publicFiles: true,
            uniform: true,
            basePath: '',
        },
    })
};
module.exports = ({env}) => ({
    upload: getStoragePlugin(env),
})