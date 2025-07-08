import {
  integer,
  pgTable,
  timestamp,
  uuid,
  varchar,
} from 'drizzle-orm/pg-core';

const timestamps = {
  updated_at: timestamp().defaultNow().notNull(),
  created_at: timestamp().defaultNow().notNull(),
};

export const catsTable = pgTable('cats', {
  id: uuid().primaryKey().defaultRandom(),
  name: varchar().notNull(),
  breed: varchar().notNull(),
  age: integer().notNull(),
  ...timestamps,
});
