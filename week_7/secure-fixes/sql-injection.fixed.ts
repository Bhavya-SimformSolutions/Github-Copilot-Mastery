// Using parameterized queries (PostgreSQL/MySQL with pg/mysql2)
export async function getUserByEmail(email: string) {
  // Validate input
  if (!email || typeof email !== 'string') {
    throw new Error('Invalid email parameter');
  }

  // Use parameterized query to prevent SQL injection
  const query = 'SELECT * FROM users WHERE email = ?';
  return db.query(query, [email]);
}
