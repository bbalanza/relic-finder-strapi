const axios = jest.requireActual('axios')
module.exports = {
    ...axios,
    post: jest.fn(_ => ({
        status: 200,
        statusText: 'OK',
        data: 'test data'
    }))
}