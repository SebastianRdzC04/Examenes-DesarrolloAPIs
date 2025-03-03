"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.usersRelations = exports.usersSchema = void 0;
const pg_core_1 = require("drizzle-orm/pg-core");
const drizzle_orm_1 = require("drizzle-orm");
const roles_schema_1 = require("./roles.schema");
const quotes_schema_1 = require("./quotes.schema");
const events_schema_1 = require("./events.schema");
exports.usersSchema = (0, pg_core_1.pgTable)('users', {
    id: (0, pg_core_1.uuid)().primaryKey().defaultRandom(),
    username: (0, pg_core_1.varchar)({ length: 50 }).notNull(),
    phone: (0, pg_core_1.varchar)({ length: 20 }).notNull(),
    password: (0, pg_core_1.varchar)().notNull(),
    created_at: (0, pg_core_1.timestamp)().defaultNow(),
    role_id: (0, pg_core_1.uuid)().references(() => roles_schema_1.rolesSchema.id),
    is_on: (0, pg_core_1.boolean)().default(true).notNull(),
});
exports.usersRelations = (0, drizzle_orm_1.relations)(exports.usersSchema, ({ one, many }) => ({
    role: one(roles_schema_1.rolesSchema, {
        fields: [exports.usersSchema.id],
        references: [roles_schema_1.rolesSchema.id],
    }),
    quotes: many(quotes_schema_1.quotesSchema),
    events: many(events_schema_1.eventsSchema)
}));
