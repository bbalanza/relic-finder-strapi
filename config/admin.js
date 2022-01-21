module.exports = ({ env }) => ({
  auth: {
    secret: env('ADMIN_JWT_SECRET', '855e4f1e95f1a418f55fdb9312d9964f'),
  },
});
