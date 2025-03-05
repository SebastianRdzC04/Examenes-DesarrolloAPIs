import {Request, Response} from "express";
import {body, validationResult, matchedData, param} from "express-validator";
import {eventsServices} from "../services/events.services";
import {quotesServices} from "../services/quotes.services";
import {EventInterface} from "../models/event.model";
import {messageServices} from "../services/message.services";

const createEvent = async (req: Request, res: Response) => {
    try {
        const id  = req.user?.id;

        if (!id) {
            res.status(403).json({msg: 'You are not allowed to create an event'});
            return
        }
        const {data} = matchedData(req, {locations: ['body']});

        const quote = await quotesServices.getQuoteById(data.quote_id);


        if (!quote) {
            res.status(404).json({msg: 'Quote does not exist'});
            return
        }
        if (quote.event) {
            res.status(400).json({msg: 'Quote already has an event'});
            return
        }

        const payPending = (data.total_payed - (quote.estimated_price ? quote.estimated_price : 0)) * -1;

        const eventData : EventInterface = {
            user_id: id,
            description: data.description ? data.description : '',
            quote_id: data.quote_id,
            date: quote.date as string,
            time_toStart: data.time_toStart,
            place_id: quote.place_id,
            total_price: quote.estimated_price? quote.estimated_price:0,
            total_payed: data.total_payed,
            total_debt: payPending

        }

        if (!quote.user) {
            res.status(404).json({msg: 'User does not exist'});
            return
        }

        //await messageServices.sendMessage(quote.user?.phone, `Profe si ve este mensaje. ya pongame 10 en el examen lo tkm`);

        const event = await eventsServices.createEvent(eventData);

        res.status(201).json({msg: 'Successfully created event', ctx: event});

    } catch (err) {
        console.error(err);
        res.status(500).json({msg: 'Internal server error', ctx: err});
    }
}

const updateEventAdmin = async (req: Request, res: Response) => {
    try {
        const id = req.params.id;
        const {data} = matchedData(req, {locations: ['body']});

        console.log(data)

        const eventExisting = await eventsServices.getEventById(id);

        if (!eventExisting) {
            res.status(404).json({msg: 'Event does not exist'});
            return
        }
        if (eventExisting.status !== 'pending') {
            res.status(400).json({msg: 'Event is not pending'});
            return
        }

        const event = await eventsServices.updateEvent(id, data);

        res.json({msg: 'Successfully updated event', ctx: event});

    } catch (err) {
        console.error(err);
        res.status(500).json({msg: 'Internal server error', ctx: []});
    }
}

const updateEventUser = async (req: Request, res: Response) => {
    try {
        const {id} = req.params;

        const {data} = matchedData(req, {locations: ['body']});

        const eventExisting = await eventsServices.getEventById(id);

        if (!eventExisting) {
            res.status(404).json({msg: 'Event does not exist'});
            return
        }
        if (eventExisting.user_id !== req.user?.id) {
            res.status(403).json({msg: 'You are not allowed to update this event'});
            return
        }
        if (eventExisting.status !== 'pending') {
            res.status(400).json({msg: 'Event is not pending'});
            return
        }

        const event = await eventsServices.updateEvent(id, data);

        res.json({msg: 'Successfully updated event', ctx: event});

    } catch (err) {
        console.error(err);
        res.status(500).json({msg: 'Internal server error', ctx: []});
    }
}

const cancelEvent = async (req: Request, res: Response) => {
    try {
        const {id} = req.params;

        const eventExisting = await eventsServices.getEventById(id);

        if (!eventExisting) {
            res.status(404).json({msg: 'Event does not exist'});
            return
        }

        if (eventExisting.status !== 'pending') {
            res.status(400).json({msg: 'Event is not pending'});
            return
        }

        const event = await eventsServices.cancelEvent(id);

        res.json({msg: 'Successfully cancelled event', ctx: event});

    } catch (err) {
        console.error(err);
        res.status(500).json({msg: 'Internal server error', ctx: []});
    }
}

const startEvent = async (req: Request, res: Response) => {
    try {
        const {id} = req.params;

        const eventExisting = await eventsServices.getEventById(id);

        if (!eventExisting) {
            res.status(404).json({msg: 'Event does not exist'});
            return
        }

        if (eventExisting.status !== 'pending') {
            res.status(400).json({msg: 'Event is not pending'});
            return
        }

        const event = await eventsServices.startEvent(id);

        res.json({msg: 'Successfully started event', ctx: event});

    } catch (err) {
        console.error(err);
        res.status(500).json({msg: 'Internal server error', ctx: []});
    }
}

const finishEvent = async (req: Request, res: Response) => {
    try {
        const {id} = req.params;

        const eventExisting = await eventsServices.getEventById(id);

        if (!eventExisting) {
            res.status(404).json({msg: 'Event does not exist'});
            return
        }

        if (eventExisting.status !== 'on process') {
            res.status(400).json({msg: 'Event is not on process'});
            return
        }

        const event = await eventsServices.finishEvent(id);

        res.json({msg: 'Successfully finished event', ctx: event});

    } catch (err) {
        console.error(err);
        res.status(500).json({msg: 'Internal server error', ctx: []});
    }
}

const deleteEvent = async (req: Request, res: Response) => {
    try {
        const {id} = req.params;

        const eventExisting = await eventsServices.getEventById(id);

        if (!eventExisting) {
            res.status(404).json({msg: 'Event does not exist'});
            return
        }

        const event = await eventsServices.deleteEvent(id);

        res.json({msg: 'Successfully deleted event', ctx: event});

    } catch (err) {
        console.error(err);
        res.status(500).json({msg: 'Internal server error', ctx: []});
    }
}

const getEventById = async (req: Request, res: Response) => {
    try {
        const {id} = req.params;

        const event = await eventsServices.getEventById(id);

        if (!event) {
            res.status(404).json({msg: 'Event does not exist'});
            return
        }

        res.json({msg: 'Successfully retrieved event', ctx: event});

    } catch (err) {
        console.error(err);
        res.status(500).json({msg: 'Internal server error', ctx: []});
    }
}

const getEventsByUser = async (req: Request, res: Response) => {
    try {
        const {user_id} = req.params;

        const events = await eventsServices.getEventsByUser(user_id);

        res.json({msg: 'Successfully retrieved events', ctx: events});

    } catch (err) {
        console.error(err);
        res.status(500).json({msg: 'Internal server error', ctx: []});
    }
}

const getEventsByPlace = async (req: Request, res: Response) => {
    try {
        const {place_id} = req.params;

        const events = await eventsServices.getEventsByPlace(place_id);

        res.json({msg: 'Successfully retrieved events', ctx: events});

    } catch (err) {
        console.error(err);
        res.status(500).json({msg: 'Internal server error', ctx: []});
    }
}

export const eventsController = {
    createEvent,
    updateEventAdmin,
    updateEventUser,
    cancelEvent,
    startEvent,
    finishEvent,
    deleteEvent,
    getEventById,
    getEventsByUser,
    getEventsByPlace
}