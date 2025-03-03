"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.quotesRelations = exports.quotesSchema = void 0;
const pg_core_1 = require("drizzle-orm/pg-core");
const users_schema_1 = require("./users.schema");
const places_schema_1 = require("./places.schema");
const drizzle_orm_1 = require("drizzle-orm");
const events_schema_1 = require("./events.schema");
const quotesEnnum = (0, pg_core_1.pgEnum)('status', ['pending', 'accepted', 'rejected']);
exports.quotesSchema = (0, pg_core_1.pgTable)('quotes', {
    id: (0, pg_core_1.uuid)().primaryKey().defaultRandom(),
    user_id: (0, pg_core_1.uuid)().references(() => users_schema_1.usersSchema.id),
    place_id: (0, pg_core_1.uuid)().references(() => places_schema_1.placesSchema.id),
    title: (0, pg_core_1.varchar)({ length: 255 }).notNull(),
    date: (0, pg_core_1.date)().notNull(),
    status: quotesEnnum().notNull().default('pending'),
    estimated_price: (0, pg_core_1.integer)(),
    espected_advance: (0, pg_core_1.integer)(),
    is_on: (0, pg_core_1.boolean)().default(true).notNull(),
});
exports.quotesRelations = (0, drizzle_orm_1.relations)(exports.quotesSchema, ({ one, many }) => ({
    user: one(users_schema_1.usersSchema, {
        fields: [exports.quotesSchema.user_id],
        references: [users_schema_1.usersSchema.id],
    }),
    place: one(places_schema_1.placesSchema, {
        fields: [exports.quotesSchema.place_id],
        references: [places_schema_1.placesSchema.id],
    }),
    event: one(events_schema_1.eventsSchema)
}));
