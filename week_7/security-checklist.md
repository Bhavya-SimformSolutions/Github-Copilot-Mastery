# Security Checklist for AI-Generated Code

## Input Validation
- [ ] All user inputs are validated for type and format
- [ ] Input length limits are defined and enforced
- [ ] Special characters are properly handled
- [ ] File uploads are validated (type, size, content)
- [ ] URL parameters are sanitized
- [ ] Query strings are validated
- [ ] Request body size limits are enforced
- [ ] Arrays and objects have depth/size limits

## Injection Prevention
- [ ] SQL queries use parameterized statements or ORMs
- [ ] No eval() or similar dynamic code execution
- [ ] Command injection prevention in system calls
- [ ] LDAP queries are properly escaped
- [ ] XPath queries use parameterization
- [ ] Template engines auto-escape by default
- [ ] No string concatenation in queries
- [ ] User input never directly executed as code

## Cross-Site Scripting (XSS) Prevention
- [ ] All output is properly encoded/escaped
- [ ] Content-Security-Policy headers are set
- [ ] Framework auto-escaping is enabled
- [ ] HTML sanitization for rich content
- [ ] JavaScript context escaping is used
- [ ] URL context escaping is applied
- [ ] No innerHTML with user data

## Authentication & Authorization
- [ ] Authentication is server-side only
- [ ] Passwords use bcrypt/argon2 (not MD5/SHA1)
- [ ] JWT tokens are verified and validated
- [ ] Session management is secure (httpOnly, secure, sameSite)
- [ ] Authorization checks on every request
- [ ] Role-based access control (RBAC) is implemented
- [ ] Multi-factor authentication is supported
- [ ] Password reset process is secure
- [ ] Account lockout after failed attempts
- [ ] No client-side authorization logic

## Cryptography
- [ ] Strong algorithms used (AES-256, RSA-2048+)
- [ ] No hardcoded secrets or keys
- [ ] Random IVs for encryption
- [ ] Proper key management and rotation
- [ ] TLS 1.2+ for data in transit
- [ ] Sensitive data encrypted at rest
- [ ] Cryptographic libraries are up to date
- [ ] No custom crypto implementations
- [ ] Secure random number generation

## Data Protection
- [ ] Sensitive data not logged
- [ ] PII is anonymized/pseudonymized where possible
- [ ] Error messages don't leak information
- [ ] Stack traces hidden in production
- [ ] Environment variables not exposed
- [ ] Database credentials secured
- [ ] API keys stored securely
- [ ] Passwords never logged or stored in plain text
- [ ] Credit card data complies with PCI DSS
- [ ] GDPR/privacy compliance considered

## API Security
- [ ] Rate limiting implemented
- [ ] CORS properly configured
- [ ] API keys validated
- [ ] Request size limits enforced
- [ ] Content-Type validation
- [ ] CSRF protection enabled
- [ ] API versioning in place
- [ ] Throttling for expensive operations
- [ ] Authentication required for sensitive endpoints
- [ ] API documentation secured

## File Handling
- [ ] Path traversal prevented
- [ ] File type validation (not just extension)
- [ ] Virus scanning for uploads
- [ ] Files stored outside webroot
- [ ] Proper access controls on files
- [ ] File size limits enforced
- [ ] Allowlist for file extensions
- [ ] Filename sanitization
- [ ] Secure file permissions set

## Error Handling
- [ ] Generic error messages for users
- [ ] Detailed errors only in logs
- [ ] No sensitive data in errors
- [ ] Proper exception handling
- [ ] Fail securely (deny by default)
- [ ] Error tracking/monitoring in place
- [ ] Different error messages don't leak info
- [ ] Proper HTTP status codes used

## Session Management
- [ ] Session IDs are random and unpredictable
- [ ] Session timeout implemented
- [ ] Secure session storage
- [ ] Session invalidation on logout
- [ ] Concurrent session controls
- [ ] Session fixation prevented
- [ ] httpOnly and secure flags set

## Dependencies & Supply Chain
- [ ] Dependencies are up to date
- [ ] No known vulnerabilities (npm audit, Snyk)
- [ ] Minimal dependencies used
- [ ] Dependency integrity checks (lock files)
- [ ] License compliance verified
- [ ] Third-party code reviewed
- [ ] Automated dependency updates configured

## Code Quality & Best Practices
- [ ] No secrets in code or version control
- [ ] Proper type safety (TypeScript strict mode)
- [ ] Security linting enabled (ESLint security plugins)
- [ ] Code review completed
- [ ] Security tests written
- [ ] Principle of least privilege applied
- [ ] Secure defaults configured
- [ ] No debug code in production

## Testing & Verification
- [ ] Security unit tests exist
- [ ] Integration tests cover security scenarios
- [ ] Penetration testing performed
- [ ] SAST/DAST tools used
- [ ] Vulnerability scanning automated
- [ ] Security regression tests
- [ ] Fuzz testing for inputs
- [ ] Threat modeling completed

## Logging & Monitoring
- [ ] Security events are logged
- [ ] Audit trail for sensitive operations
- [ ] Log tampering prevention
- [ ] Real-time alerting configured
- [ ] Log retention policy defined
- [ ] Centralized logging in place
- [ ] Sensitive data sanitized in logs

## Deployment & Configuration
- [ ] Secure configuration management
- [ ] Principle of least privilege for services
- [ ] Security headers configured (CSP, HSTS, X-Frame-Options)
- [ ] Audit logging enabled
- [ ] Monitoring and alerting setup
- [ ] Secrets stored in secure vault
- [ ] Production environment hardened
- [ ] Unnecessary services disabled

## Copilot-Specific Checks
- [ ] Reviewed Copilot suggestions for security issues
- [ ] Verified parameterized queries in generated SQL
- [ ] Checked for proper input validation
- [ ] Ensured no hardcoded credentials
- [ ] Validated authentication/authorization logic
- [ ] Reviewed error handling approach
- [ ] Confirmed secure crypto practices
- [ ] Checked for XSS vulnerabilities
- [ ] Verified rate limiting implementation
- [ ] Reviewed for information disclosure
- [ ] Checked for path traversal issues
- [ ] Manually reviewed business logic security

---

## How to Use This Checklist

1. **During Code Review**: Go through relevant sections based on code changes
2. **Before Deployment**: Complete full checklist for new features
3. **Regular Audits**: Review entire codebase quarterly
4. **AI Code Review**: Extra attention to Copilot-specific checks
5. **Security Training**: Use as learning tool for team members

## Priority Levels

- **🔴 Critical**: Must be addressed before deployment
- **🟡 High**: Should be addressed soon
- **🟢 Medium**: Address in regular development cycle
- **⚪ Low**: Nice to have, consider for future

Apply priority levels based on your application's risk profile and compliance requirements.
