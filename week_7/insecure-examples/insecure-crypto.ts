import crypto from 'crypto';

export function hashPassword(password: string) {
  return crypto.createHash('md5').update(password).digest('hex');
}

export function encryptData(data: string) {
  const cipher = crypto.createCipher('aes-128-ecb', 'hardcoded-key');
  return cipher.update(data, 'utf8', 'hex') + cipher.final('hex');
}
