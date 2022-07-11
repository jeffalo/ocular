import { MongoClient } from 'mongodb';

export const DB_URL = process.env.DB_URL || "mongodb://localhost"
export const MONGODB_DB = process.env.MONGODB_DB || "my-ocular"

if (!DB_URL) {
  throw new Error('Please define the mongoURI property inside .env');
}

/**
 * Global is used here to maintain a cached connection across hot reloads
 * in development. This prevents connections growing exponentially
 * during API Route usage.
 */
let cached = global.mongo;

if (!cached) {
  cached = global.mongo = { conn: null, promise: null };
}

export const connectToDatabase = async () => {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    const opts = {
      useNewUrlParser: true,
      useUnifiedTopology: true
    };

    cached.promise = MongoClient.connect(DB_URL, opts).then((client) => {
      // lets create our indexes now
      const db = client.db(MONGODB_DB);

      // usernames should have a unique index, and case insensitive
      db.collection('users').createIndex({ name: 1 }, {
        unique: true,
        collation: {
          locale: 'en',
          strength: 2
        }
      });

      return {
        client,
        db
      };
    });
  }
  cached.conn = await cached.promise;
  return cached.conn;
}