export async function login(username: string, password: string) {
  const user = await db.users.findOne({ username });
  
  if (!user) {
    return { success: false, message: 'User not found' };
  }
  
  if (user.password !== password) {
    return { success: false, message: 'Invalid password' };
  }
  
  return { success: true, token: generateToken(user) };
}
