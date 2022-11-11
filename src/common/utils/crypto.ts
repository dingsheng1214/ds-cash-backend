/**
 * 加解密
 */
import * as crypto from 'crypto';

/**
 * 随机盐
 * @returns salt盐
 */
export function makeSalt() {
  return crypto.randomBytes(3).toString('base64');
}

/**
 * 加密
 * @param val 待加密的值
 * @param salt 盐
 * @returns 加密后的值
 */
export function encrypt(val: string, salt: string) {
  if (!val || !salt) return '';
  const tempSalt = Buffer.from(salt, 'base64');
  const result = crypto
    .pbkdf2Sync(val, tempSalt, 10000, 16, 'sha1')
    .toString('base64');
  return result;
}
