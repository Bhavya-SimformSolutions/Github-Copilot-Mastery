export interface User {
  id: string;
  email: string;
  isActive: boolean;
}

export class ValidationError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'ValidationError';
  }
}

export async function getUser(id: string): Promise<User> {
  if (!id || id.trim() === '') {
    throw new ValidationError('User ID is required and cannot be empty');
  }

  if (id.length < 1 || id.length > 50) {
    throw new ValidationError('User ID must be between 1 and 50 characters');
  }

  return {
    id: id.trim(),
    email: 'test@email.com',
    isActive: true
  };
}
