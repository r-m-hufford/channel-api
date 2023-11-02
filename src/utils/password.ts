import bcrypt from 'bcrypt';
import { User } from '../models/user';

export async function hashPassword(password: String): Promise<string> {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(`${password}${process.env.AUTH_PEPPER}`, salt);
}

export function confirmNewPassword(password: string, confirmPassword: string): boolean {
  return password === confirmPassword;
}

export async function validatePassword(password: any, user: User): Promise<boolean> {
  return await bcrypt.compare(`${password}${process.env.AUTH_PEPPER}`, user.password);
}