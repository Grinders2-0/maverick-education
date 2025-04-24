import NodeCache from 'node-cache';
import logger from './logger.js';

// Initialize cache with TTL (time to live) in seconds
const ttl = parseInt(process.env.CACHE_TTL) || 3600; // Default: 1 hour
const checkPeriod = parseInt(process.env.CACHE_CHECK_PERIOD) || 600; // Default: 10 minutes

const cache = new NodeCache({
  stdTTL: ttl,
  checkperiod: checkPeriod,
  useClones: false, // To improve performance
});

// Log cache events
cache.on('set', (key) => {
  logger.debug(`Cache: Key set - ${key}`);
});

cache.on('del', (key) => {
  logger.debug(`Cache: Key deleted - ${key}`);
});

cache.on('expired', (key) => {
  logger.debug(`Cache: Key expired - ${key}`);
});

cache.on('flush', () => {
  logger.info('Cache: Flushed all keys');
});

// Cache middleware for Express routes
export const cacheMiddleware = (duration = ttl) => {
  return (req, res, next) => {
    // Skip caching for POST, PUT, DELETE methods
    if (req.method !== 'GET') {
      return next();
    }

    // Create a cache key from the URL and query parameters
    const cacheKey = `${req.originalUrl || req.url}`;
    const cachedResponse = cache.get(cacheKey);

    if (cachedResponse) {
      logger.debug(`Cache HIT: ${cacheKey}`);
      return res.json(cachedResponse);
    }

    // Override res.json to cache the response
    const originalJson = res.json;
    res.json = function(body) {
      // Only cache successful responses
      if (res.statusCode >= 200 && res.statusCode < 300) {
        cache.set(cacheKey, body, duration);
        logger.debug(`Cache MISS: ${cacheKey} - Cached for ${duration}s`);
      }
      return originalJson.call(this, body);
    };

    next();
  };
};

export default cache; 