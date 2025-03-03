import {pgTable, uuid, varchar} from "drizzle-orm/pg-core";
import {relations} from "drizzle-orm";
import {usersSchema} from "./users.schema";


export const rolesSchema = pgTable('roles', {
    id: uuid().primaryKey().defaultRandom(),
    name: varchar({length: 50}).notNull(),
})

export const rolesRelations = relations(rolesSchema, ({one, many}) => ({
    users: many(usersSchema),
}));