module.exports = [
  'strapi::errors',
  {
    name: 'strapi::security',
    config: {
      contentSecurityPolicy: {
        useDefaults: true,
        directives: {
          'default-src': ["'self'", 'https:', 'storage.googleapis.com'],
          upgradeInsecureRequests: null,
        },
      },
    },
  },
  'strapi::cors',
  {
    name: 'strapi::cors',
    config: {
      origin: ['*', 'storage.googleapis.com'],
    }
  },
  'strapi::poweredBy',
  'strapi::logger',
  'strapi::query',
  'strapi::body',
  'strapi::favicon',
  'strapi::session',
  'strapi::public',
];
