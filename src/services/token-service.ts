import { RevokedToken } from "../models/revoked-token";

export async function getAllTokens(): Promise<string[]> {
  const revokedTokens = await RevokedToken.findAll();
  return revokedTokens.map((rt) => rt.token);
}

export function checkForRevokedToken(token: string, revokedTokens: string[]): boolean {
  return revokedTokens.includes(token);
}