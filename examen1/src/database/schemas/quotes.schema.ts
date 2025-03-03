import {boolean, date, integer, pgEnum, pgTable, time, uuid, varchar} from "drizzle-orm/pg-core";
import {usersSchema} from "./users.schema";
import {placesSchema} from "./places.schema";
import {relations} from "drizzle-orm";
import {eventsSchema} from "./events.schema";

const quotesEnnum = pgEnum('status', ['pending', 'accepted', 'rejected'])

export const quotesSchema = pgTable('quotes', {
    id: uuid().primaryKey().defaultRandom(),
    user_id: uuid().references(() => usersSchema.id),
    place_id: uuid().references(() => placesSchema.id),
    title: varchar({length: 255}).notNull(),
    date: date().notNull(),
    status: quotesEnnum().notNull().default('pending'),
    estimated_price: integer(),
    espected_advance: integer(),
    is_on: boolean().default(true).notNull(),
})

export const quotesRelations = relations(quotesSchema, ({one, many}) => ({
    user: one(usersSchema, {
        fields: [quotesSchema.user_id],
        references: [usersSchema.id],
    }),
    place: one(placesSchema, {
        fields: [quotesSchema.place_id],
        references: [placesSchema.id],
    }),
    event: one(eventsSchema)
}))
