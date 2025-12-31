const { getUserProfile } = require('../service/user.service');

// Mock the db module
jest.mock('../service/user.service', () => {
  const originalModule = jest.requireActual('../service/user.service');
  return {
    ...originalModule,
  };
});

// Mock db at global level
global.db = {
  getUserById: jest.fn(),
};

describe('getUserProfile', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should throw error when userId is not provided', async () => {
    await expect(getUserProfile()).rejects.toThrow('User ID is required');
    await expect(getUserProfile(null)).rejects.toThrow('User ID is required');
    await expect(getUserProfile('')).rejects.toThrow('User ID is required');
  });

  it('should throw error when user is not found', async () => {
    db.getUserById.mockResolvedValue(null);
    await expect(getUserProfile('123')).rejects.toThrow('User not found');
    expect(db.getUserById).toHaveBeenCalledWith('123');
  });

  it('should return user profile with lowercase email', async () => {
    const mockUser = {
      id: '123',
      email: 'TEST@EXAMPLE.COM',
      role: 'admin',
    };
    db.getUserById.mockResolvedValue(mockUser);

    const result = await getUserProfile('123');

    expect(result).toEqual({
      id: '123',
      email: 'test@example.com',
      role: 'admin',
    });
    expect(db.getUserById).toHaveBeenCalledWith('123');
  });

  it('should handle user with already lowercase email', async () => {
    const mockUser = {
      id: '456',
      email: 'user@example.com',
      role: 'user',
    };
    db.getUserById.mockResolvedValue(mockUser);

    const result = await getUserProfile('456');

    expect(result).toEqual({
      id: '456',
      email: 'user@example.com',
      role: 'user',
    });
  });

  it('should handle different user roles', async () => {
    const roles = ['admin', 'user', 'moderator', 'guest'];

    for (const role of roles) {
      const mockUser = {
        id: '789',
        email: 'test@example.com',
        role: role,
      };
      db.getUserById.mockResolvedValue(mockUser);

      const result = await getUserProfile('789');

      expect(result.role).toBe(role);
    }
  });
});