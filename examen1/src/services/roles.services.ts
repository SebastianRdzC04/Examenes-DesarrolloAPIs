import {db} from '../database';
import * as models from "../database/schemas";
import {eq, and} from "drizzle-orm";
import {Rol} from "../models/rol.model";


const getRoleByName = async (name: string) => {
    const [role] = await db.select()
        .from(models.rolesSchema)
        .where(eq(models.rolesSchema.name, name))
        .execute();
    const rolreturn = new Rol(role)
    return rolreturn
}

const getRoleById = async (id: string) => {
    const [role] = await db.select()
        .from(models.rolesSchema)
        .where(eq(models.rolesSchema.id, id))
        .execute();
    const rolreturn = new Rol(role)
    return rolreturn
}

export const rolesServices = {
    getRoleByName,
    getRoleById
}