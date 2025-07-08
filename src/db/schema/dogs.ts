import {
  integer,
  pgTable,
  timestamp,
  uuid,
  varchar,
} from 'drizzle-orm/pg-core';
import { owners } from './owner';
import { relations, sql } from 'drizzle-orm';

const timestamps = {
  updated_at: timestamp().defaultNow().notNull(),
  created_at: timestamp().defaultNow().notNull(),
};

export const dogs = pgTable('dogs', {
  id: uuid().primaryKey().defaultRandom(),
  name: varchar().notNull(),
  breed: varchar().notNull(),
  age: integer().notNull(),
  owner_id: uuid().default(sql`null`),
  ...timestamps,
});

export const dogsRelations = relations(dogs, ({ one }) => ({
  owner: one(owners, {
    fields: [dogs.owner_id],
    references: [owners.id],
  }),
}));
