import {db} from '../database';
import * as models from "../database/schemas";
import {eq, and} from "drizzle-orm";
import {Event, EventInterface} from "../models/event.model";


const createEvent = async (eventData: EventInterface) => {
    const [event] = await db.insert(models.eventsSchema).values(eventData).returning()
    const eventComplete = await db.query.eventsSchema.findFirst({
        where: eq(models.eventsSchema.id, event.id),
        with: {
            user: true,
            place: true,
            quote: true
        }
    })
    if (!eventComplete) {
        throw new Error('Event not found')
    }
    return new Event(eventComplete);
}

const updateEvent = async (id: string, data: EventInterface) => {
    const [event] = await db.update(models.eventsSchema)
        .set(data)
        .where(and(
            eq(models.eventsSchema.id, id),
            eq(models.eventsSchema.is_on, true)))
        .returning()
    return new Event(event)
}

const getEventById = async (id: string) => {
    const [event] = await db.select()
        .from(models.eventsSchema)
        .where(and(
            eq(models.eventsSchema.id, id),
            eq(models.eventsSchema.is_on, true))).execute()

    return  new Event(event)
}

const getEventsByDate = async (date: string) => {
    const events = await db.query.eventsSchema.findMany({
        where: and(
            eq(models.eventsSchema.date, date),
            eq(models.eventsSchema.is_on, true)
        ),
        with: {
            user: true,
            place: true,
            quote: true
        }
    })

    return events.map(event => new Event(event))
}

const getEventsByPlace = async (place_id: string) => {
    const events = await db.select()
        .from(models.eventsSchema)
        .where(and(
            eq(models.eventsSchema.place_id, place_id),
            eq(models.eventsSchema.is_on, true))).execute()

    return events.map(event => new Event(event))
}

const getEventsByUser = async (user_id: string) => {
    const events = await db.select()
        .from(models.eventsSchema)
        .where(and(
            eq(models.eventsSchema.user_id, user_id),
            eq(models.eventsSchema.is_on, true))).execute()

    return events.map(event => new Event(event))
}

const cancelEvent = async (id: string) => {
    const [event] = await db.update(models.eventsSchema)
        .set({status: 'cancelled'})
        .where(eq(models.eventsSchema.id, id))
        .returning()
    return new Event(event)
}

const startEvent = async (id: string) => {
    const [event] = await db.update(models.eventsSchema)
        .set({status: 'on process'})
        .where(eq(models.eventsSchema.id, id))
        .returning()
    return new Event(event)
}

const finishEvent = async (id: string) => {
    const [event] = await db.update(models.eventsSchema)
        .set({status: 'done'})
        .where(eq(models.eventsSchema.id, id))
        .returning()
    return new Event(event)
}

const deleteEvent = async (id: string) => {
    const [event] = await db.update(models.eventsSchema)
        .set({is_on: false})
        .where(eq(models.eventsSchema.id, id))
        .returning()
    return new Event(event)
}

export const eventsServices = {
    createEvent,
    updateEvent,
    getEventById,
    getEventsByDate,
    getEventsByPlace,
    getEventsByUser,
    cancelEvent,
    startEvent,
    finishEvent,
    deleteEvent
}

