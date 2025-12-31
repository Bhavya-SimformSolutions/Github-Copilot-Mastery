const redis = require('redis');

// Create Redis client
const client = redis.createClient({
    host: 'localhost',
    port: 6379
});

client.on('error', (err) => {
    console.error('Redis Client Error', err);
});

client.on('connect', () => {
    console.log('Connected to Redis');
});

/**
 * Cache API response in Redis
 * @param {string} key - Cache key
 * @param {*} data - Data to cache
 * @param {number} expiration - Expiration time in seconds (default: 3600)
 */
async function setCache(key, data, expiration = 3600) {
    try {
        await client.connect();
        const value = JSON.stringify(data);
        await client.setEx(key, expiration, value);
        await client.disconnect();
        console.log(`Cached data for key: ${key}`);
    } catch (error) {
        console.error('Error setting cache:', error);
        throw error;
    }
}

/**
 * Get cached API response from Redis
 * @param {string} key - Cache key
 * @returns {*} Cached data or null if not found
 */
async function getCache(key) {
    try {
        await client.connect();
        const data = await client.get(key);
        await client.disconnect();
        
        if (data) {
            console.log(`Cache hit for key: ${key}`);
            return JSON.parse(data);
        }
        
        console.log(`Cache miss for key: ${key}`);
        return null;
    } catch (error) {
        console.error('Error getting cache:', error);
        return null;
    }
}

/**
 * Delete cached data
 * @param {string} key - Cache key
 */
async function deleteCache(key) {
    try {
        await client.connect();
        await client.del(key);
        await client.disconnect();
        console.log(`Deleted cache for key: ${key}`);
    } catch (error) {
        console.error('Error deleting cache:', error);
        throw error;
    }
}

module.exports = {
    setCache,
    getCache,
    deleteCache
};

/**
 * Reusable function to cache GET API responses
 * @param {string} key - Cache key
 * @param {Function} fetchFn - Function to fetch data if cache miss
 * @param {number} ttl - Time to live in seconds (default: 3600)
 * @returns {*} Cached or freshly fetched data
 */
async function getCachedOrFetch(key, fetchFn, ttl = 3600) {
    try {
        // Try to get from cache first
        const cached = await getCache(key);
        if (cached !== null) {
            return cached;
        }
        
        // Cache miss - fetch fresh data
        const freshData = await fetchFn();
        
        // Cache the fresh data (don't throw if caching fails)
        try {
            await setCache(key, freshData, ttl);
        } catch (cacheError) {
            console.warn('Failed to cache data, continuing with fresh data:', cacheError);
        }
        
        return freshData;
    } catch (error) {
        console.error('Error in getCachedOrFetch:', error);
        // Fallback to fetching fresh data if Redis fails
        return await fetchFn();
    }
}

module.exports = {
    setCache,
    getCache,
    deleteCache,
    getCachedOrFetch
};