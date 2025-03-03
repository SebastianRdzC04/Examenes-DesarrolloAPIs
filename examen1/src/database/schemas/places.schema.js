"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.placesRelations = exports.placesSchema = void 0;
const pg_core_1 = require("drizzle-orm/pg-core");
const drizzle_orm_1 = require("drizzle-orm");
const quotes_schema_1 = require("./quotes.schema");
const events_schema_1 = require("./events.schema");
exports.placesSchema = (0, pg_core_1.pgTable)('places', {
    id: (0, pg_core_1.uuid)().primaryKey().defaultRandom(),
    name: (0, pg_core_1.varchar)({ length: 100 }).notNull(),
    description: (0, pg_core_1.varchar)({ length: 255 }).notNull(),
    max_capacity: (0, pg_core_1.integer)().notNull(),
    is_on: (0, pg_core_1.boolean)().default(true).notNull(),
});
exports.placesRelations = (0, drizzle_orm_1.relations)(exports.placesSchema, ({ one, many }) => ({
    quotes: many(quotes_schema_1.quotesSchema),
    events: many(events_schema_1.eventsSchema)
}));
