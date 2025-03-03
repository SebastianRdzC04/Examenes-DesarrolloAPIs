import {boolean, date, integer, pgEnum, pgTable, time, uuid, varchar} from "drizzle-orm/pg-core";
import {placesSchema} from "./places.schema";
import {usersSchema} from "./users.schema";
import {relations} from "drizzle-orm";
import {quotesSchema} from "./quotes.schema";

const eventsEnnum = pgEnum('status', ['pending', 'on process', 'cancelled', 'done'])

export const eventsSchema = pgTable('events', {
    id: uuid().primaryKey().defaultRandom(),
    user_id: uuid().references(() => usersSchema.id),
    quote_id: uuid().references(() => quotesSchema.id).notNull(),
    description: varchar({length: 255}).notNull(),
    status: eventsEnnum().notNull().default('pending'),
    date: date().notNull(),
    time_toStart: time().notNull(),
    time_toEnd: time(),
    place_id: uuid().references(() => placesSchema.id),
    total_price: integer().notNull(),
    total_payed: integer().notNull(),
    total_debt: integer().notNull(),
    is_on: boolean().default(true).notNull(),
});

export const eventsRelations = relations(eventsSchema, ({one, many}) => ({
    user: one(usersSchema, {
        fields: [eventsSchema.id],
        references: [usersSchema.id],
    }),
    place: one(placesSchema, {
        fields: [eventsSchema.id],
        references: [placesSchema.id]
    }),
    quote: one(quotesSchema, {
        fields: [eventsSchema.quote_id],
        references: [quotesSchema.id]
    })
}));