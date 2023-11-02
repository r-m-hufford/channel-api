import { HttpError } from "./httpError";
import { User } from "../models/user";
import { decodeToken } from "../utils/jwt";

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

    // check if token is revoked
    // check if the token is expired
      // if expired throw 403, route to auth/refresh-token in client
    
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

// async function tokenIsRevoked(token): Promise<boolean> {
//   const revokedTokens = await getAllTokens();
//   return checkForRevokedToken(token, revokedTokens);
// }