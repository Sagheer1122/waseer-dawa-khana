import bcrypt from 'bcryptjs';
import connectDB from '../config/db';
import Admin, { IAdmin } from '../models/Admin';
import { signAdminToken, AdminJwtPayload } from '../middleware/verifyAdmin';

export async function hashPassword(password: string): Promise<string> {
  const salt = await bcrypt.genSalt(10);
  return bcrypt.hash(password, salt);
}

export async function comparePassword(password: string, hash: string): Promise<boolean> {
  return bcrypt.compare(password, hash);
}

/**
 * Ensures at least one admin account exists in the database.
 * Auto-provisions from environment variables if collection is empty.
 */
export async function ensureDefaultAdmin(): Promise<IAdmin | null> {
  const conn = await connectDB();
  if (!conn) {
    return null;
  }

  try {
    const count = await Admin.countDocuments();
    if (count === 0) {
      const email = (process.env.ADMIN_DEFAULT_EMAIL || 'admin@waseerhairoil.com').toLowerCase();
      const plainPassword = process.env.ADMIN_DEFAULT_PASSWORD || 'AdminPass123!';
      const name = process.env.ADMIN_DEFAULT_NAME || 'WASEER Dawa Khana Admin';

      const hashedPassword = await hashPassword(plainPassword);

      const newAdmin = await Admin.create({
        email,
        password: hashedPassword,
        name,
        role: 'admin',
      });

      console.log(`[Admin] Initialized default admin account: ${email}`);
      return newAdmin;
    }
  } catch (err: any) {
    console.warn('[Admin] Note: Database not ready for seeding admin:', err.message);
  }

  return null;
}

export async function loginAdmin(emailInput: string, passwordInput: string) {
  const email = emailInput.trim().toLowerCase();
  const password = passwordInput.trim();
  const defaultEmail = (process.env.ADMIN_DEFAULT_EMAIL || 'admin@waseerhairoil.com').toLowerCase();
  const defaultPassword = (process.env.ADMIN_DEFAULT_PASSWORD || 'AdminPass123!').trim();

  let conn = null;
  try {
    conn = await connectDB();
  } catch (e) {
    // DB not reachable
  }

  if (conn) {
    try {
      await ensureDefaultAdmin();
      const admin = await Admin.findOne({ email });

      if (admin) {
        const isMatch = await comparePassword(password, admin.password);
        if (!isMatch) {
          throw new Error('Invalid email or password');
        }

        const payload: AdminJwtPayload = {
          adminId: (admin._id as any).toString(),
          email: admin.email,
          name: admin.name,
          role: admin.role,
        };

        const token = signAdminToken(payload);
        return {
          admin: {
            id: payload.adminId,
            email: payload.email,
            name: payload.name,
            role: payload.role,
          },
          token,
        };
      }
    } catch (err: any) {
      console.warn('[Admin Auth] Notice: Using fallback admin check:', err.message);
    }
  }

  // Resilient fallback to default admin credentials
  if (email === defaultEmail && password === defaultPassword) {
    const payload: AdminJwtPayload = {
      adminId: 'default-admin-id',
      email: defaultEmail,
      name: process.env.ADMIN_DEFAULT_NAME || 'WASEER Dawa Khana Admin',
      role: 'admin',
    };

    const token = signAdminToken(payload);
    return {
      admin: {
        id: payload.adminId,
        email: payload.email,
        name: payload.name,
        role: payload.role,
      },
      token,
    };
  }

  throw new Error('Invalid email or password');
}
