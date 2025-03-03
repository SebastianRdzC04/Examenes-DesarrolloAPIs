import {db} from '../database';
import * as models from "../database/schemas";
import {eq, and} from "drizzle-orm";


const getRoleByName = async (name: string) => {
    const [role] = await db.select()
        .from(models.rolesSchema)
        .where(eq(models.rolesSchema.name, name))
        .execute()
    return role
}

export const rolesServices = {
    getRoleByName,
}