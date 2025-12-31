const axios = require('axios');

/**
 * Fetches user data from an API
 * @param {string} userId - The user ID to fetch
 * @returns {Promise<Object>} User data object
 * @throws {Error} If userId is invalid or API request fails
 */
async function fetchUserData(userId) {
    if (!userId || typeof userId !== 'string') {
        throw new Error('Invalid userId: must be a non-empty string');
    }

    try {
        const response = await axios.get(`https://api.example.com/users/${userId}`);
        
        if (response.status !== 200) {
            throw new Error(`Failed to fetch user data: HTTP ${response.status}`);
        }

        return response.data;
    } catch (error) {
        if (error.response) {
            throw new Error(`API error: ${error.response.status} - ${error.response.statusText}`);
        }
        
        if (error.request) {
            throw new Error('Network error: No response received from server');
        }
        
        throw new Error(`Failed to fetch user data: ${error.message}`);
    }
}

module.exports = { fetchUserData };