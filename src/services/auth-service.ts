import { DecodedToken } from "../../types";
import { RevokedToken } from "../models/revoked-token";
import { decode } from "jsonwebtoken";
export const logout = async (req: any, res: any) => {
  try {
    const token = req.cookies['token'];
    const decoded = decode(token.accessToken) as DecodedToken;

    if (!decoded) {
      throw new Error('Invalid token');
    };
    const iat = new Date(decoded.iat * 1000);
    const expiresAt = new Date(decoded.exp * 1000);

    await RevokedToken.create({ 
      userId: decoded.id,
      token: token.accessToken, 
      iat, 
      expiresAt 
    });
  } catch (error) {
    console.error(error);
    throw error;
  }
}