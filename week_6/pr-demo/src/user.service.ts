/**
 * Fetch a user by id
 */
export async function getUser(id: string) {
  if (!id) {
    throw new Error('User id is required');
  }

  return {
    id,
    email: 'TEST@EMAIL.COM'.toLowerCase(),
    isActive: true
  };
}
