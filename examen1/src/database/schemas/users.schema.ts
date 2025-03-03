import {integer, pgTable, varchar, uuid, timestamp, boolean} from "drizzle-orm/pg-core"
import {relations} from "drizzle-orm";
import {rolesSchema} from "./roles.schema";
import {quotesSchema} from "./quotes.schema";
import {eventsSchema} from "./events.schema";

export const usersSchema = pgTable('users', {
    id: uuid().primaryKey().defaultRandom(),
    username: varchar({length: 50}).notNull(),
    phone: varchar({length: 20}).notNull(),
    password: varchar().notNull(),
    created_at: timestamp().defaultNow(),
    role_id: uuid().references(() => rolesSchema.id),
    is_on: boolean().default(true).notNull(),
});


export const usersRelations = relations(usersSchema, ({one, many}) => ({
    role: one(rolesSchema, {
        fields: [usersSchema.id],
        references: [rolesSchema.id],
    }),
    quotes: many(quotesSchema),
    events: many(eventsSchema)
}));