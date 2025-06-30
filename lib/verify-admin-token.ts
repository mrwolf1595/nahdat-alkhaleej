import { jwtVerify } from 'jose';
import { getJwtSecret } from './jwt-secret';

export const verifyAdminToken = async (token: string) => {
  try {
    const secret = await getJwtSecret();
    const { payload } = await jwtVerify(token, secret);
    return payload; // يحتوي على بيانات المستخدم داخل الـ token
  } catch (err) {
    console.error('❌ Invalid token in API route', err);
    return null;
  }
};
