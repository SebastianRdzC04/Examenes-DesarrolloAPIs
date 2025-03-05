import {db} from '../database';
import * as models from "../database/schemas";
import {User, UserInterface} from "../models/user.model";
import {eq, and} from "drizzle-orm";
import {RolInterface} from "../models/rol.model";

const getAllUsers = async () => {
    return await db.select().from(models.usersSchema).where(eq(models.usersSchema.is_on, true)).execute()
}

const createUser = async (userData: UserInterface)=> {
    const [user] = await db.insert(models.usersSchema).values(userData).returning()
    const userWithRole  = await db.query.usersSchema.findFirst({
        where: eq(models.usersSchema.id, user.id),
        with: {
            role: true
        }
    })
    console.log(userWithRole)
    if (!userWithRole) {
        throw new Error('User not found')
    }
    const userCreated = new User(userWithRole)
    return userWithRole
}

const getUserByPhone = async (phone: string) => {
    const [user] = await db.select()
        .from(models.usersSchema)
        .where(and(
            eq(models.usersSchema.phone, phone),
            eq(models.usersSchema.is_on, true)))
        .execute()
    return user
}

const getUserById = async (id: string) => {
    const [user] = await db.select()
        .from(models.usersSchema)
        .where(and(
            eq(models.usersSchema.id, id),
            eq(models.usersSchema.is_on, true))).execute()
    return user
}

const deleteUser = async (id: string) => {
    const [user] = await db.update(models.usersSchema)
        .set({is_on: false})
        .where(eq(models.usersSchema.id, id))
        .returning()
    return user

}

const updateUser = async (id: string, data: UserInterface) => {
    const [user] = await db.update(models.usersSchema)
        .set(data)
        .where(eq(models.usersSchema.id, id))
        .returning()
    return user
}

export const usersServices = {
    getAllUsers,
    createUser,
    getUserByPhone,
    deleteUser,
    updateUser,
    getUserById
}