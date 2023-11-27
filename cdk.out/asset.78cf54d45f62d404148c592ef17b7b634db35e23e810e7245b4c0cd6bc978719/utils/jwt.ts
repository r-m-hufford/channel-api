import { sign, decode, verify } from 'jsonwebtoken';
import { User } from '../models/user';
//revoked token model
//database instance
//decoded token type

export function generateToken(user: Partial<User>, expiresIn: number | string = '1d', refreshIn: number | string = '5d') {
  const privateKey = process.env.JWT_PRIVATE_KEY;

  if (!privateKey) {
    throw new Error('JWT_PRIVATE_KEY is not defined');
  }
  
  const accessToken = sign(
    {id: user.id, email: user.email, type: 'ACCESS'},
    privateKey,
    { expiresIn: expiresIn }
  )
  
  const refreshToken = sign(
    {id: user.id, email: user.email, type: 'REFRESH'},
    privateKey,
    { expiresIn: refreshIn }
  )

  return {
    accessToken,
    refreshToken
  }
}

// export async function invalidateToken(token: string) {
//   const decoded = decode(token);

//   let revokedToken = new RevokedToken();

//   revokedToken.token = token;
//   revokedToken.iat = new Date(decoded.iat * 1000);
//   revokedToken.expiresAt = new Date(decoded.exp * 1000);

//   revokedToken = await revokedTokenRepo.save(revokedToken);
// }

export function verifyToken(token: string): boolean {
  const privateKey = process.env.JWT_PRIVATE_KEY;

  if (!privateKey) {
    throw new Error('JWT_PRIVATE_KEY is not defined');
  }
  const result = verify(token, privateKey);
  return typeof result === 'object';
}

export function decodeToken(token: string): any {
  return decode(token);
}