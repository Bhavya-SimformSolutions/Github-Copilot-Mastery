import { getUser, ValidationError } from '../src/user.service';

describe('getUser', () => {
  test('returns user with valid id', async () => {
    const user = await getUser('1');
    expect(user.id).toBe('1');
    expect(user.email).toBe('test@email.com');
    expect(user.isActive).toBe(true);
  });

  test('normalizes email to lowercase', async () => {
    const user = await getUser('123');
    expect(user.email).toBe('test@email.com');
    expect(user.email).not.toContain('TEST');
  });

  test('throws ValidationError when id is empty string', async () => {
    await expect(getUser('')).rejects.toThrow(ValidationError);
    await expect(getUser('')).rejects.toThrow('User ID is required and cannot be empty');
  });

  test('throws ValidationError when id is whitespace only', async () => {
    await expect(getUser('   ')).rejects.toThrow(ValidationError);
    await expect(getUser('   ')).rejects.toThrow('User ID is required and cannot be empty');
  });

  test('throws ValidationError when id is too long', async () => {
    const longId = 'a'.repeat(51);
    await expect(getUser(longId)).rejects.toThrow(ValidationError);
    await expect(getUser(longId)).rejects.toThrow('User ID must be between 1 and 50 characters');
  });

  test('trims whitespace from id', async () => {
    const user = await getUser('  123  ');
    expect(user.id).toBe('123');
  });

  test('accepts id at maximum length boundary', async () => {
    const maxId = 'a'.repeat(50);
    const user = await getUser(maxId);
    expect(user.id).toBe(maxId);
  });
});
