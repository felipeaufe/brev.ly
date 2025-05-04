import { pgTable, text, integer, timestamp } from "drizzle-orm/pg-core";

export const links = pgTable('links', {
  code: text('code').notNull().unique(),
  link: text('link').notNull(),
  accessCount: integer('access_count').notNull().default(0),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});