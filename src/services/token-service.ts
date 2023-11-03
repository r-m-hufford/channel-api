import { RevokedToken } from "../models/revoked-token";

export async function getAllTokens(): Promise<string[]> {
  try {
    const revokedTokens = await RevokedToken.findAll();
    return revokedTokens.map((rt) => rt.token);
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export function checkForRevokedToken(token: string, revokedTokens: string[]): boolean {
  return revokedTokens.includes(token);
}