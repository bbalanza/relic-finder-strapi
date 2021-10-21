module.exports = {
    upload: {
        provider: 'google-cloud-storage',
        providerOptions: {
            bucketName: '#relic-finder-staging-media#',
            publicFiles: false,
            uniform: false,
            basePath: '',
        },
    },
}