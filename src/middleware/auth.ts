import { HttpError } from "./httpError";
import { User } from "../models/user";

export const authMiddleware = async (req: any, res: any, next: any) => {
  try {
    const { url, method } = req;
    if (userIsSigningUpOrLoggingIn(url, method)) {
      return next();
    }

    const token = req.cookies['token'];
    console.log('this is the token: ', token);
    if (!token) {
      throw new HttpError(401, ['No token provided']);
    }

    const user = await User.findOne({
      where: { id: token.id }
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


// function getReqUserCode(token: string): string {
//   const decoded = decodeToken(token);
//   return decoded.userCode;
// }