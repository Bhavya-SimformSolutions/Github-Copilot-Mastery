interface User {
  id: string;
  email: string;
  role: string;
}

export function logUserActivity(user: User, action: string) {
  // Log only necessary non-sensitive information
  console.log({
    userId: user.id,
    userRole: user.role,
    action: action,
    timestamp: new Date().toISOString()
  });
}

export function getErrorResponse(error: Error, isDevelopment: boolean = false) {
  // Generic error message for production
  const response: any = {
    message: 'An error occurred. Please try again later.',
    errorId: generateErrorId() // For tracking purposes
  };
  
  // Only include details in development environment
  if (isDevelopment) {
    response.details = error.message;
    response.stack = error.stack;
  }
  
  // Never expose environment variables
  return response;
}

function generateErrorId(): string {
  return `ERR-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
}

// Sanitize sensitive fields before logging
export function sanitizeForLogging(data: any): any {
  const sensitiveFields = ['password', 'token', 'apiKey', 'secret', 'ssn', 'creditCard'];
  const sanitized = { ...data };
  
  for (const field of sensitiveFields) {
    if (sanitized[field]) {
      sanitized[field] = '***REDACTED***';
    }
  }
  
  return sanitized;
}
