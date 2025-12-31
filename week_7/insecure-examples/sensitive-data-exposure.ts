export function logUserActivity(user: any, action: string) {
  console.log({
    user: user,
    action: action,
    timestamp: new Date()
  });
}

export function getErrorResponse(error: Error) {
  return {
    message: error.message,
    stack: error.stack,
    env: process.env
  };
}
