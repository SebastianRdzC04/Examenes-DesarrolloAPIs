import {boolean, integer, pgTable, uuid, varchar} from "drizzle-orm/pg-core"
import {relations} from "drizzle-orm";
import {quotesSchema} from "./quotes.schema";
import {eventsSchema} from "./events.schema";

export const placesSchema = pgTable('places', {
    id: uuid().primaryKey().defaultRandom(),
    name: varchar({length: 100}).notNull(),
    description: varchar({length: 255}).notNull(),
    max_capacity: integer().notNull(),
    is_on: boolean().default(true).notNull(),
});

export const placesRelations = relations(placesSchema, ({one, many}) => ({
    quotes: many(quotesSchema),
    events: many(eventsSchema)
}));