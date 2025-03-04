import {db} from '../database'
import * as schemas from '../database/schemas'
import {Place, PlaceInterface} from '../models/place.model'
import {eq, and} from 'drizzle-orm'

const getAllPlaces = async () => {
    const places = await db.select().from(schemas.placesSchema).where(eq(schemas.placesSchema.is_on, true)).execute()
    return places.map(place => new Place(place))
}

const createPlace = async (placeData: PlaceInterface) => {
    const [place] = await db.insert(schemas.placesSchema).values(placeData).returning()
    const placeModel = new Place(place)
    return placeModel
}

const getPlaceById = async (id: string) => {
    const [place] = await db.select()
        .from(schemas.placesSchema)
        .where(and(
            eq(schemas.placesSchema.id, id),
            eq(schemas.placesSchema.is_on, true)))
        .execute()
    return new Place(place)
}

const deletePlace = async (id: string) => {
    const [place] = await db.update(schemas.placesSchema).set({is_on: false}).where(eq(schemas.placesSchema.id, id)).returning()
    return new Place(place)
}

const updatePlace = async (id: string, data: PlaceInterface) => {
    const [place] = await db.update(schemas.placesSchema).set(data).where(eq(schemas.placesSchema.id, id)).returning()
    return new Place(place)
}

export const placesServices = {
    getAllPlaces,
    createPlace,
    getPlaceById,
    deletePlace,
    updatePlace
}
