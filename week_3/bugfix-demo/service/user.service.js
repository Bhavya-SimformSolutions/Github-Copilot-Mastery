async function getUserProfile(userId) {
  if (!userId) {
    throw new Error('User ID is required');
  }

  const user = await db.getUserById(userId);

  if (!user) {
    throw new Error('User not found');
  }

  return {
    id: user.id,
    email: user.email.toLowerCase(),
    role: user.role
  };
}

module.exports = { getUserProfile };
