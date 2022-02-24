module.exports = [
  'strapi::errors',
  {
    name: 'strapi::security',
    config: {
      contentSecurityPolicy: {
        useDefaults: false,
        directives: {
          'default-src': ["'self'", 'https:', 'data:', 'blob:', 'storage.googleapis.com', 'relic-finder-pilot--staging-g5x5qtyx.web.app', 'relic-finder.gelmanmuseum.org'],
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
