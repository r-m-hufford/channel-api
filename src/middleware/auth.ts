import { HttpError } from "./httpError";
import { User } from "../models/user";
import { decodeToken } from "../utils/jwt";
import { getAllTokens, checkForRevokedToken } from "../services/token-service";

export const authMiddleware = async (req: any, res: any, next: any) => {
  try {
    const { url, method } = req;
    // console.log('this is the url: ', url);
    if (userIsSigningUpOrLoggingIn(url, method)) {
      return next();
    }

    const token = req.cookies['accessToken'];
    const decoded = decodeToken(token);
    // console.log('this is the token: ', token);
    if (!token) {
      throw new HttpError(401, ['No token provided']);
    }

    const isRevoked = await tokenIsRevoked(token);
    if (isRevoked) {
      throw new HttpError(401, ['Token is revoked']);
    }

    const isExpired = await tokenIsExpired(decoded.exp);
    if (isExpired) {
      throw new HttpError(401, ['Token is expired']);
    }
    
    const user = await User.findOne({
      where: { id: decoded.id }
    });
    if (!user) {
      throw new HttpError(401, ['Invalid token']);
    }
    req.user = user;
    next();
  } catch (error) {
    next(error);
  }
}

function userIsSigningUpOrLoggingIn(url: string, method: string): boolean {
  return method === 'POST' && (url === '/users/signup' || url === '/auth/login');
}

function routeDoesNotRequireToken(url: string, method: string): boolean {
  return method === 'POST' && (url === '/users/signup' || url === '/auth/login' || url === '/auth/refresh-token');
}

async function tokenIsRevoked(token: string): Promise<boolean> {
  const revokedTokens = await getAllTokens();
  return checkForRevokedToken(token, revokedTokens);
}

async function tokenIsExpired(decodedExp: string): Promise<boolean> {
  const now = new Date();
  const expirationDate = new Date(decodedExp);

  return now.getTime() > expirationDate.getTime();
}