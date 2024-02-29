import { pgTable, serial, varchar } from 'drizzle-orm/pg-core';

export const cities = pgTable('filler', {
  id: serial('id').primaryKey(),
  name: varchar('name', { length: 256 }),
});
