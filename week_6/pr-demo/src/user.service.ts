/**
 * Retrieves a user by their ID.
 * 
 * @param id - The unique identifier of the user to retrieve
 * @returns A promise that resolves to a user object containing id, email, and isActive status
 * @throws {Error} Throws an error if the user id is not provided
 * 
 * @example
 * ```typescript
 * const user = await getUser('123');
 * console.log(user.email); // 'test@email.com'
 * ```
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
