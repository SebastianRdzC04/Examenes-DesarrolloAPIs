import {db} from '../database';
import * as models from "../database/schemas";
import {eq, and} from "drizzle-orm";
import {Quote, quoteInterface} from "../models/quote.model";

const createQuote = async (quoteData: quoteInterface) => {
    const [quote] = await db.insert(models.quotesSchema).values(quoteData).returning()
    const quoteComplete = await db.query.quotesSchema.findFirst({
        where: eq(models.quotesSchema.id, quote.id),
        with: {
            user: true,
            place: true
        }
    })
    if (!quoteComplete) {
        throw new Error('Quote not found')
    }
    return new Quote(quoteComplete);
}

const updateQuote = async (id: string, data: quoteInterface) => {
    const [quote] = await db.update(models.quotesSchema)
        .set(data)
        .where(and(
            eq(models.quotesSchema.id, id),
            eq(models.quotesSchema.is_on, true)))
        .returning()
    return new Quote(quote)
}

const getQuoteById = async (id: string) => {
    const [quote] = await db.select()
        .from(models.quotesSchema)
        .where(and(
            eq(models.quotesSchema.id, id),
            eq(models.quotesSchema.is_on, true))).execute()

    const quoteWithRelations = await db.query.quotesSchema.findFirst({
        where: and(
            eq(models.quotesSchema.id, id),
            eq(models.quotesSchema.is_on, true)
        ),
        with: {
            user: true,
            place: true,
            event: true
        }
    })

    if (!quoteWithRelations) {
        throw new Error('Quote not found')
    }

    return  new Quote(quoteWithRelations)
}

const getQuotesByDate = async (date: string) => {
    const quotes = await db.query.quotesSchema.findMany({
        where: and(
            eq(models.quotesSchema.date, date),
            eq(models.quotesSchema.is_on, true)
        ),
        with: {
            user: true,
            place: true
        }
    })

    return quotes.map(quote => new Quote(quote))
}

const getQuotesByPlace = async (place_id: string) => {
    const quotes = await db.select()
        .from(models.quotesSchema)
        .where(and(
            eq(models.quotesSchema.place_id, place_id),
            eq(models.quotesSchema.is_on, true))).execute()

    return quotes.map(quote => new Quote(quote))
}

const getQuotesByUser = async (user_id: string) => {
    const quotes = await db.select()
        .from(models.quotesSchema)
        .where(and(
            eq(models.quotesSchema.user_id, user_id),
            eq(models.quotesSchema.is_on, true))).execute()

    return quotes.map(quote => new Quote(quote))
}

const acceptQuote = async (id: string) => {
    const [quote] = await db.update(models.quotesSchema)
        .set({status: 'accepted'})
        .where(eq(models.quotesSchema.id, id))
        .returning()
    const quoteWithRelations = await db.query.quotesSchema.findFirst({
        where: eq(models.quotesSchema.id, id),
        with: {
            user: true,
            place: true
        }
    })
    if (!quoteWithRelations) {
        throw new Error('Quote not found')
    }
    return new Quote(quoteWithRelations)
}

const cancelQuote = async (id: string) => {
    const [quote] = await db.update(models.quotesSchema)
        .set({status: 'rejected'})
        .where(eq(models.quotesSchema.id, id))
        .returning()
    return new Quote(quote)
}

const deleteQuote = async (id: string) => {
    const [quote] = await db.update(models.quotesSchema)
        .set({is_on: false})
        .where(eq(models.quotesSchema.id, id))
        .returning()
    return new Quote(quote)
}

export const quotesServices = {
    createQuote,
    updateQuote,
    getQuoteById,
    deleteQuote,
    getQuotesByDate,
    getQuotesByPlace,
    getQuotesByUser,
    cancelQuote,
    acceptQuote
}