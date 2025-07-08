import { relations } from 'drizzle-orm';
import { pgTable, timestamp, uuid, varchar } from 'drizzle-orm/pg-core';
import { cats } from './cats';
import { dogs } from './dogs';

const timestamps = {
  updated_at: timestamp().defaultNow().notNull(),
  created_at: timestamp().defaultNow().notNull(),
};

export const owners = pgTable('owners', {
  id: uuid().primaryKey().defaultRandom(),
  name: varchar().notNull(),
  ...timestamps,
});

export const ownersRelations = relations(owners, ({ many }) => ({
  cats: many(cats),
  dogs: many(dogs),
}));
