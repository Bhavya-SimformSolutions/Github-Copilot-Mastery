## [Unreleased]

### Added
- User retrieval functionality with `getUser` service method
- User controller endpoint to handle GET user by ID requests
- Input validation for user ID parameter
- Comprehensive JSDoc documentation for `getUser` function with usage examples

### Changed
- Email addresses normalized to lowercase for consistency

### Features
- **User Service (`user.service.ts`)**
    - Async function to retrieve user data by ID
    - Returns user object with `id`, `email`, and `isActive` properties
    - Error handling for missing user IDs

- **User Controller (`user.controller.ts`)**
    - Express controller for `/user/:id` endpoint
    - HTTP 400 response for missing user ID
    - HTTP 404 response for user not found
    - HTTP 500 response for server errors
    - Structured JSON error responses

### Technical Details
- TypeScript implementation with Express framework
- Proper error handling and HTTP status codes
- Request/Response typing with Express types