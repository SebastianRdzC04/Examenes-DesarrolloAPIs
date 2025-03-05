import {Request, Response} from "express";
import {body, validationResult, matchedData, param} from "express-validator";
import {quotesServices} from "../services/quotes.services";
import {paymentServices} from "../services/payment.services";
import {EventInterface} from "../models/event.model";
import {eventsServices} from "../services/events.services";

const createQuote = async (req: Request, res: Response) => {
    try {
        const id = req.user?.id;

        const {data} = matchedData(req, {locations: ['body']});

        const quoteData = {
            ...data,
            user_id: id
        }

        const quote = await quotesServices.createQuote(quoteData);

        res.status(201).json({msg: 'Successfully created quote', ctx: quote});

    } catch (err) {
        console.error(err);
        res.status(500).json({msg: 'Internal server error', ctx: err});
    }
}

const updateQuoteAdmin = async (req: Request, res: Response) => {
    try {
        const id = req.params.id;
        const {data} = matchedData(req, {locations: ['body']});

        console.log(data)

        const quoteExisting = await quotesServices.getQuoteById(id);

        if (!quoteExisting) {
            res.status(404).json({msg: 'Quote does not exist'});
            return
        }
        if (quoteExisting.status !== 'pending') {
            res.status(400).json({msg: 'Quote is not pending'});
            return
        }

        const quote = await quotesServices.updateQuote(id, data);

        res.json({msg: 'Successfully updated quote', ctx: quote});

    } catch (err) {
        console.error(err);
        res.status(500).json({msg: 'Internal server error', ctx: []});
    }
}

const updateQuoteUser = async (req: Request, res: Response) => {
    try {
        const {id} = req.params;

        const {data} = matchedData(req, {locations: ['body']});

        const quoteExisting = await quotesServices.getQuoteById(id);

        if (!quoteExisting) {
            res.status(404).json({msg: 'Quote does not exist'});
            return
        }
        if (quoteExisting.status === 'rejected') {
            res.status(400).json({msg: 'Quote is rejected'});
            return
        }
        if (quoteExisting.user_id !== req.user?.id) {
            res.status(403).json({msg: 'You are not allowed to update this quote'});
            return
        }

        const quote = await quotesServices.updateQuote(id, data);

        res.json({msg: 'Successfully updated quote', ctx: quote});

    } catch (err) {
        console.error(err);
        res.status(500).json({msg: 'Internal server error', ctx: []});
    }
}

const cancelQuote = async (req: Request, res: Response) => {
    try {
        const {id} = req.params;

        const quoteExisting = await quotesServices.getQuoteById(id);

        if (!quoteExisting) {
            res.status(404).json({msg: 'Quote does not exist'});
            return
        }
        if (quoteExisting.status !== 'pending') {
            res.status(400).json({msg: 'Quote is not pending'});
            return
        }

        const quote = await quotesServices.cancelQuote(id);

        res.json({msg: 'Successfully canceled quote', ctx: quote});

    } catch (err) {
        console.error(err);
        res.status(500).json({msg: 'Internal server error', ctx: []});
    }
}

const getQuote = async (req: Request, res: Response) => {
    const {id} = req.params;
    const quote = await quotesServices.getQuoteById(id);
    if (!quote) {
        res.status(404).json({msg: 'Quote does not exist', ctx: []});
        return
    }
    res.json({msg: 'Quote', ctx: [quote]});
    return
}

const getQuotesByDate = async (req: Request, res: Response) => {
    const {date} = req.params;
    const quotes = await quotesServices.getQuotesByDate(date);
    res.json({msg: 'Quotes by date', ctx: quotes});
    return
}

const getQuotesByPlace = async (req: Request, res: Response) => {
    const {place_id} = req.params;
    const quotes = await quotesServices.getQuotesByPlace(place_id);
    res.json({msg: 'Quotes by place', ctx: quotes});
    return
}

const getQuotesByUser = async (req: Request, res: Response) => {
    const {user_id} = req.params;
    const quotes = await quotesServices.getQuotesByUser(user_id);
    res.json({msg: 'Quotes by user', ctx: quotes});
    return
}

const payQuote = async (req: Request, res: Response) => {
    try {
        const {id} = req.params;

        const {amount, paymentId} = req.body

        const quoteExisting = await quotesServices.getQuoteById(id);

        if (!quoteExisting) {
            res.status(404).json({msg: 'Quote does not exist'});
            return
        }
        if (quoteExisting.status !== 'pending') {
            res.status(400).json({msg: 'Quote is not valid'});
            return
        }
        if (!quoteExisting.espected_advance) {
            res.status(400).json({msg: 'Quote does not have an expected advance'});
            return
        }
        if(quoteExisting.espected_advance > amount){
            res.status(400).json({msg: 'Amount is not enough'});
            return
        }

        const quote = await quotesServices.acceptQuote(id);

        try {
            const dataToPayment = {
                phone: quote.user?.phone as string,
                place: quote.place?.name as string,
                date: quote.date.toString(),
                time: '20:00'
            }
            await paymentServices.createPaymentIntent(amount, paymentId, dataToPayment);

        } catch (err) {
            console.error(err);
            res.status(500).json({msg: 'Internal server error', ctx: []});
            return
        }
        const eventData: EventInterface = {
            date: quote.date.toString(),
            place_id: quote.place_id,
            quote_id: id,
            user_id: quote.user_id,
            description: '',
            total_payed: amount,
            total_price: quote.estimated_price as number,
            total_debt: quote.estimated_price as number - amount,
            time_toStart: '20:00'
        }

        const event = await eventsServices.createEvent(eventData);


        res.json({msg: 'Successfully paid quote', ctx: quote});

    } catch (err) {
        console.error(err);
        res.status(500).json({msg: 'Internal server error', ctx: []});
    }
}

export const quotesController = {
    createQuote,
    updateQuoteAdmin,
    updateQuoteUser,
    cancelQuote,
    getQuote,
    getQuotesByDate,
    getQuotesByPlace,
    getQuotesByUser,
    payQuote
}
