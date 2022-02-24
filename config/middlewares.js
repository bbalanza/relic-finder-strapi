module.exports = [
  'strapi::errors',
  {
    name: 'strapi::security',
    config: {
      contentSecurityPolicy: {
        useDefaults: true,
        directives: {
          'connect-src': ["'self'", 'https:'],
          'img-src': ["'self'", 'data:', 'blob:', 'storage.googleapis.com'],
          'media-src': ["'self'", 'data:', 'blob:', 'storage.googleapis.com'],
          'script-src': ["'self'", 'https://relic-finder-pilot--staging-g5x5qtyx.web.app', 'https://relic-finder.gelmanmuseum.org/'],
          'script-src-attr': ["'self'", 'https://relic-finder-pilot--staging-g5x5qtyx.web.app', 'https://relic-finder.gelmanmuseum.org/'],
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
