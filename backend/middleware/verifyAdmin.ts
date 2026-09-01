import { NextRequest } from 'next/server';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'waseer_dawa_khana_super_secret_jwt_key_2026_change_in_production';

export interface AdminJwtPayload {
  adminId: string;
  email: string;
  role: string;
  name?: string;
}

/**
 * Extracts and verifies admin authentication from HTTP-only cookie or Bearer token header.
 */
export function verifyAdminToken(req: NextRequest): AdminJwtPayload | null {
  // 1. Try reading cookie
  const cookieToken = req.cookies.get('admin_token')?.value;

  let token = cookieToken;

  // 2. Fallback to Authorization Header
  if (!token) {
    const authHeader = req.headers.get('authorization');
    if (authHeader && authHeader.startsWith('Bearer ')) {
      token = authHeader.substring(7);
    }
  }

  if (!token) {
    return null;
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET) as AdminJwtPayload;
    return decoded;
  } catch (error) {
    return null;
  }
}

export function signAdminToken(payload: AdminJwtPayload): string {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: '7d' });
}
