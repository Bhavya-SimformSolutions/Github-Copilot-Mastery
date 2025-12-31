const fetchUserData = async (userId) => {
    try {
        const response = await fetch(`https://api.example.com/users/${userId}`);
        
        // Handle non-OK responses
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        return data;
    } catch (error) {
        // Handle network errors or JSON parsing errors
        console.error('Failed to fetch user data:', error.message);
        throw error;
    }
};

// Jest unit tests
describe('fetchUserData', () => {
    beforeEach(() => {
        global.fetch = jest.fn();
    });

    afterEach(() => {
        jest.resetAllMocks();
    });

    it('should fetch user data successfully', async () => {
        const mockUser = { id: 1, name: 'John Doe' };
        global.fetch.mockResolvedValue({
            ok: true,
            json: async () => mockUser,
        });

        const result = await fetchUserData(1);
        expect(result).toEqual(mockUser);
        expect(fetch).toHaveBeenCalledWith('https://api.example.com/users/1');
    });

    it('should throw error on HTTP error status', async () => {
        global.fetch.mockResolvedValue({
            ok: false,
            status: 404,
        });

        await expect(fetchUserData(1)).rejects.toThrow('HTTP error! status: 404');
    });

    it('should handle network errors', async () => {
        global.fetch.mockRejectedValue(new Error('Network error'));

        await expect(fetchUserData(1)).rejects.toThrow('Network error');
    });

    it('should handle JSON parsing errors', async () => {
        global.fetch.mockResolvedValue({
            ok: true,
            json: async () => { throw new Error('Invalid JSON'); },
        });

        await expect(fetchUserData(1)).rejects.toThrow('Invalid JSON');
    });
});

export default fetchUserData;