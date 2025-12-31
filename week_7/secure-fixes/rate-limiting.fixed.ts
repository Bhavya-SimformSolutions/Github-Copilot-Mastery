import bcrypt from 'bcrypt';
import rateLimit from 'express-rate-limit';

// Rate limiter for login attempts
export const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // Limit each IP to 5 requests per windowMs
  message: 'Too many login attempts. Please try again later.',
  standardHeaders: true,
  legacyHeaders: false,
});

export async function login(username: string, password: string) {
  // Validate inputs
  if (!username || !password) {
    return { success: false, message: 'Invalid credentials' };
  }
  
  try {
    const user = await db.users.findOne({ username });
    
    // Use constant-time comparison to prevent timing attacks
    // Always hash even if user doesn't exist
    const passwordHash = user?.password || '$2b$12$dummyHashToPreventTimingAttack';
    const isValid = await bcrypt.compare(password, passwordHash);
    
    // Generic error message to prevent user enumeration
    if (!user || !isValid) {
      // Log failed attempt for security monitoring
      await logFailedLoginAttempt(username);
      return { success: false, message: 'Invalid credentials' };
    }
    
    // Check if account is locked
    if (user.locked) {
      return { success: false, message: 'Account is locked. Contact support.' };
    }
    
    // Reset failed login attempts on successful login
    await resetFailedLoginAttempts(user.id);
    
    return { 
      success: true, 
      token: generateToken(user),
      user: {
        id: user.id,
        username: user.username,
        role: user.role
      }
    };
  } catch (error) {
    console.error('Login error:', error);
    return { success: false, message: 'An error occurred. Please try again.' };
  }
}

async function logFailedLoginAttempt(username: string): Promise<void> {
  // Implement logic to track failed attempts
  // Lock account after threshold (e.g., 5 failed attempts)
}

async function resetFailedLoginAttempts(userId: string): Promise<void> {
  // Reset failed login counter
}

function generateToken(user: any): string {
  // Implement JWT token generation
  return 'token';
}
