module.exports = ({env}) => ({
    upload: {
        provider: 'google-cloud-storage',
        providerOptions: {
            bucketName: 'relic-finder-${env(_ENVIRONMENT)}-media',
            publicFiles: true,
            uniform: true,
            basePath: '',
        },
    },
})