/* eslint-disable no-console */
const { Router } = require('express');
const rateLimit = require('express-rate-limit');
const MongoStore = require('rate-limit-mongo');
const { MONGODB_URI } = require('../../config');

const router = Router();

/**
 * Only on my production server
 * you can probably remove this code, and leave header `Cache-control` alone
 * if your server won't to have rate limitter API usage
 * in my case, I'll limit it with 10req/5min/address & 150req/5min for the whole server
 * @see https://github.com/nfriedly/express-rate-limit
 * @see https://www.npmjs.com/package/rate-limit-mongo
 */
if (MONGODB_URI) {
  const expireTimeMs = 1000 * 60 * 5;
  const store = new MongoStore({
    uri: MONGODB_URI,
    expireTimeMs,
    errorHandler: console.error.bind(null, 'rate-limit-mongo'),
    collectionName: 'request-records'
  });
  const limiterSettings = {
    store,
    windowMs: expireTimeMs,
    standardHeaders: true,
    legacyHeaders: false
  };
  const data = {
    read: 'https://github.com/gadingnst/quran-api#terms-of-using-live-api-that-hosted-in-httpsapiquransutanlabid'
  };
  router.use(rateLimit({
    ...limiterSettings,
    max: 150,
    keyGenerator: () => '__global',
    handler: (req, res) => res.status(503).send({
      code: 503,
      status: 'Service Unavailable',
      message: 'The server has received too many incoming requests. Try again later.',
      data
    })
  }));
  router.use(rateLimit({
    ...limiterSettings,
    max: 10,
    message: {
      code: 429,
      status: 'Too Many Requests',
      message: 'You have exceeded the rate limit. Try again in a few minutes.',
      data
    }
  }));
} else {
  router.use((req, res, next) => {
    res.setHeader('Cache-Control', 'public, max-age=0, s-maxage=86400, stale-while-revalidate');
    next();
  });
}

module.exports = router;
