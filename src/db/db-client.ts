import { drizzle } from 'drizzle-orm/node-postgres';
import "dotenv/config"

export const db = drizzle({
  connection: {
    connectionString: process.env.DATABASE_URL!,
    user: process.env.DATABASE_USER!,
    password: process.env.DATABASE_PASSWORD!,
  },
});
