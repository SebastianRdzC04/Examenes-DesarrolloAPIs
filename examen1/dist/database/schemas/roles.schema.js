"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.rolesRelations = exports.rolesSchema = void 0;
const pg_core_1 = require("drizzle-orm/pg-core");
const drizzle_orm_1 = require("drizzle-orm");
const users_schema_1 = require("./users.schema");
exports.rolesSchema = (0, pg_core_1.pgTable)('roles', {
    id: (0, pg_core_1.uuid)().primaryKey().defaultRandom(),
    name: (0, pg_core_1.varchar)({ length: 50 }).notNull(),
});
exports.rolesRelations = (0, drizzle_orm_1.relations)(exports.rolesSchema, ({ one, many }) => ({
    users: many(users_schema_1.usersSchema),
}));
