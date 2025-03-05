"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.eventsRelations = exports.eventsSchema = void 0;
const pg_core_1 = require("drizzle-orm/pg-core");
const places_schema_1 = require("./places.schema");
const users_schema_1 = require("./users.schema");
const drizzle_orm_1 = require("drizzle-orm");
const quotes_schema_1 = require("./quotes.schema");
const eventsEnnum = (0, pg_core_1.pgEnum)('status', ['pending', 'on process', 'cancelled', 'done']);
exports.eventsSchema = (0, pg_core_1.pgTable)('events', {
    id: (0, pg_core_1.uuid)().primaryKey().defaultRandom(),
    user_id: (0, pg_core_1.uuid)().references(() => users_schema_1.usersSchema.id).notNull(),
    quote_id: (0, pg_core_1.uuid)().references(() => quotes_schema_1.quotesSchema.id).notNull(),
    description: (0, pg_core_1.varchar)({ length: 255 }).notNull(),
    status: eventsEnnum().notNull().default('pending'),
    date: (0, pg_core_1.date)().notNull(),
    time_toStart: (0, pg_core_1.time)().notNull(),
    time_toEnd: (0, pg_core_1.time)(),
    place_id: (0, pg_core_1.uuid)().references(() => places_schema_1.placesSchema.id).notNull(),
    total_price: (0, pg_core_1.integer)().notNull(),
    total_payed: (0, pg_core_1.integer)().notNull(),
    total_debt: (0, pg_core_1.integer)().notNull(),
    is_on: (0, pg_core_1.boolean)().default(true).notNull(),
});
exports.eventsRelations = (0, drizzle_orm_1.relations)(exports.eventsSchema, ({ one, many }) => ({
    user: one(users_schema_1.usersSchema, {
        fields: [exports.eventsSchema.user_id],
        references: [users_schema_1.usersSchema.id],
    }),
    place: one(places_schema_1.placesSchema, {
        fields: [exports.eventsSchema.place_id],
        references: [places_schema_1.placesSchema.id]
    }),
    quote: one(quotes_schema_1.quotesSchema, {
        fields: [exports.eventsSchema.quote_id],
        references: [quotes_schema_1.quotesSchema.id]
    })
}));
