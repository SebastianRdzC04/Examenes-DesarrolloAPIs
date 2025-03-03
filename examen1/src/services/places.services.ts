import {db} from '../database'
import * as schemas from '../database/schemas'
import {PlaceInterface} from '../models/place.model'
import {eq, and} from 'drizzle-orm'

const getAllPlaces = async () => {
    return await db.select().from(schemas.placesSchema).where(eq(schemas.placesSchema.is_on, true)).execute()
}

const createPlace = async (placeData: PlaceInterface) => {
    const [place] = await db.insert(schemas.placesSchema).values(placeData).returning()
    return place
}

const getPlaceById = async (id: string) => {
    const [place] = await db.select()
        .from(schemas.placesSchema)
        .where(and(
            eq(schemas.placesSchema.id, id),
            eq(schemas.placesSchema.is_on, true)))
        .execute()
    return place
}

const deletePlace = async (id: string) => {
    const [place] = await db.update(schemas.placesSchema).set({is_on: false}).where(eq(schemas.placesSchema.id, id)).returning()
    return place
}

const updatePlace = async (id: string, data: PlaceInterface) => {
    const [place] = await db.update(schemas.placesSchema).set(data).where(eq(schemas.placesSchema.id, id)).returning()
    return place
}

export const placesServices = {
    getAllPlaces,
    createPlace,
    getPlaceById,
    deletePlace,
    updatePlace
}
