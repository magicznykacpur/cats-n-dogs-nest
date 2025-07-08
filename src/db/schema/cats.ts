import { relations, sql, SQL } from 'drizzle-orm';
import {
  integer,
  pgTable,
  timestamp,
  uuid,
  varchar,
} from 'drizzle-orm/pg-core';
import { owners } from './owner';

const timestamps = {
  updated_at: timestamp().defaultNow().notNull(),
  created_at: timestamp().defaultNow().notNull(),
};

export const cats = pgTable('cats', {
  id: uuid().primaryKey().defaultRandom(),
  name: varchar().notNull(),
  breed: varchar().notNull(),
  age: integer().notNull(),
  owner_id: uuid().default(sql`null`),
  ...timestamps,
});

export const catsRelations = relations(cats, ({ one }) => ({
  owner: one(owners, {
    fields: [cats.owner_id],
    references: [owners.id],
  }),
}));
