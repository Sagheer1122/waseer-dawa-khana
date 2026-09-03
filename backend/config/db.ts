import mongoose from 'mongoose';
import dns from 'dns';

// Fix for Windows / ISP DNS resolving mongodb+srv SRV records
try {
  dns.setServers(['8.8.8.8', '1.1.1.1']);
} catch (e) {
  // Ignore in environments where setServers is restricted
}

/**
 * MongoDB Atlas Connection Singleton (Optimized for Vercel & Serverless)
 * Caches the connection across warm lambda invocations.
 */

interface MongooseCache {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
  lastFailedTime?: number;
}

declare global {
  // eslint-disable-next-line no-var
  var mongooseCache: MongooseCache | undefined;
}

let cached: MongooseCache = global.mongooseCache || { conn: null, promise: null };

if (!global.mongooseCache) {
  global.mongooseCache = cached;
}

export async function connectDB(): Promise<typeof mongoose | null> {
  const MONGODB_URI = process.env.MONGODB_URI;

  if (!MONGODB_URI) {
    return null;
  }

  if (cached.conn) {
    return cached.conn;
  }

  // Prevent repeated blocking retries if last connection attempt failed recently (< 10s)
  if (cached.lastFailedTime && Date.now() - cached.lastFailedTime < 10000) {
    return null;
  }

  if (!cached.promise) {
    const opts: mongoose.ConnectOptions = {
      serverSelectionTimeoutMS: 2000,
      connectTimeoutMS: 2000,
      socketTimeoutMS: 5000,
    };

    cached.promise = mongoose.connect(MONGODB_URI, opts).then((m) => {
      console.log('[MongoDB] Connected successfully to MongoDB Atlas.');
      cached.lastFailedTime = undefined;
      return m;
    }).catch((err) => {
      console.warn('[MongoDB] Connection notice:', err.message);
      cached.promise = null;
      cached.lastFailedTime = Date.now();
      return null as any;
    });
  }

  try {
    cached.conn = await cached.promise;
  } catch (e) {
    cached.promise = null;
    cached.lastFailedTime = Date.now();
    return null;
  }

  return cached.conn;
}

export default connectDB;
