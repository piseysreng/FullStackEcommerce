import { integer, pgTable, text, varchar } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from 'zod';
export const usersTable = pgTable('users', {
    id: integer().primaryKey().generatedAlwaysAsIdentity(),
    email: varchar({ length: 225 }).notNull().unique(),
    password: varchar({ length: 225 }).notNull(),
    role: varchar({ length: 225 }).notNull().default('user'),
    name: varchar({ length: 225 }),
    address: text(),
});
const emailFieldOverrides = {
    email: z.string().email(), // Refine the 'email' field with Zod's email validation
};
export const createUserSchema = createInsertSchema(usersTable, emailFieldOverrides).omit({ role: true });
export const loginSchema = createInsertSchema(usersTable, emailFieldOverrides).pick({ email: true, password: true });
