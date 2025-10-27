import { doublePrecision, integer, pgTable, text, varchar } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
export const productsTable = pgTable("products", {
    id: integer().primaryKey().generatedAlwaysAsIdentity(),
    name: varchar({ length: 255 }).notNull(),
    description: text(),
    image: varchar({ length: 255 }),
    price: doublePrecision().notNull(),
    quantity: integer().default(0),
});
export const createProductSchema = createInsertSchema(productsTable);
export const updateProductSchema = createInsertSchema(productsTable).partial();
