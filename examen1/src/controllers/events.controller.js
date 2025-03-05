"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.eventsController = void 0;
const express_validator_1 = require("express-validator");
const events_services_1 = require("../services/events.services");
const quotes_services_1 = require("../services/quotes.services");
const createEvent = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const id = (_a = req.user) === null || _a === void 0 ? void 0 : _a.id;
        if (!id) {
            res.status(403).json({ msg: 'You are not allowed to create an event' });
            return;
        }
        const { data } = (0, express_validator_1.matchedData)(req, { locations: ['body'] });
        const quote = yield quotes_services_1.quotesServices.getQuoteById(data.quote_id);
        if (!quote) {
            res.status(404).json({ msg: 'Quote does not exist' });
            return;
        }
        if (quote.event) {
            res.status(400).json({ msg: 'Quote already has an event' });
            return;
        }
        const payPending = (data.total_payed - (quote.estimated_price ? quote.estimated_price : 0)) * -1;
        const eventData = {
            user_id: id,
            description: data.description ? data.description : '',
            quote_id: data.quote_id,
            date: quote.date,
            time_toStart: data.time_toStart,
            place_id: quote.place_id,
            total_price: quote.estimated_price ? quote.estimated_price : 0,
            total_payed: data.total_payed,
            total_debt: payPending
        };
        if (!quote.user) {
            res.status(404).json({ msg: 'User does not exist' });
            return;
        }
        //await messageServices.sendMessage(quote.user?.phone, `Profe si ve este mensaje. ya pongame 10 en el examen lo tkm`);
        const event = yield events_services_1.eventsServices.createEvent(eventData);
        res.status(201).json({ msg: 'Successfully created event', ctx: event });
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ msg: 'Internal server error', ctx: err });
    }
});
const updateEventAdmin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const { data } = (0, express_validator_1.matchedData)(req, { locations: ['body'] });
        console.log(data);
        const eventExisting = yield events_services_1.eventsServices.getEventById(id);
        if (!eventExisting) {
            res.status(404).json({ msg: 'Event does not exist' });
            return;
        }
        if (eventExisting.status !== 'pending') {
            res.status(400).json({ msg: 'Event is not pending' });
            return;
        }
        const event = yield events_services_1.eventsServices.updateEvent(id, data);
        res.json({ msg: 'Successfully updated event', ctx: event });
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ msg: 'Internal server error', ctx: [] });
    }
});
const updateEventUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const { id } = req.params;
        const { data } = (0, express_validator_1.matchedData)(req, { locations: ['body'] });
        const eventExisting = yield events_services_1.eventsServices.getEventById(id);
        if (!eventExisting) {
            res.status(404).json({ msg: 'Event does not exist' });
            return;
        }
        if (eventExisting.user_id !== ((_a = req.user) === null || _a === void 0 ? void 0 : _a.id)) {
            res.status(403).json({ msg: 'You are not allowed to update this event' });
            return;
        }
        if (eventExisting.status !== 'pending') {
            res.status(400).json({ msg: 'Event is not pending' });
            return;
        }
        const event = yield events_services_1.eventsServices.updateEvent(id, data);
        res.json({ msg: 'Successfully updated event', ctx: event });
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ msg: 'Internal server error', ctx: [] });
    }
});
const cancelEvent = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const eventExisting = yield events_services_1.eventsServices.getEventById(id);
        if (!eventExisting) {
            res.status(404).json({ msg: 'Event does not exist' });
            return;
        }
        if (eventExisting.status !== 'pending') {
            res.status(400).json({ msg: 'Event is not pending' });
            return;
        }
        const event = yield events_services_1.eventsServices.cancelEvent(id);
        res.json({ msg: 'Successfully cancelled event', ctx: event });
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ msg: 'Internal server error', ctx: [] });
    }
});
const startEvent = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const eventExisting = yield events_services_1.eventsServices.getEventById(id);
        if (!eventExisting) {
            res.status(404).json({ msg: 'Event does not exist' });
            return;
        }
        if (eventExisting.status !== 'pending') {
            res.status(400).json({ msg: 'Event is not pending' });
            return;
        }
        const event = yield events_services_1.eventsServices.startEvent(id);
        res.json({ msg: 'Successfully started event', ctx: event });
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ msg: 'Internal server error', ctx: [] });
    }
});
const finishEvent = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const eventExisting = yield events_services_1.eventsServices.getEventById(id);
        if (!eventExisting) {
            res.status(404).json({ msg: 'Event does not exist' });
            return;
        }
        if (eventExisting.status !== 'on process') {
            res.status(400).json({ msg: 'Event is not on process' });
            return;
        }
        const event = yield events_services_1.eventsServices.finishEvent(id);
        res.json({ msg: 'Successfully finished event', ctx: event });
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ msg: 'Internal server error', ctx: [] });
    }
});
const deleteEvent = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const eventExisting = yield events_services_1.eventsServices.getEventById(id);
        if (!eventExisting) {
            res.status(404).json({ msg: 'Event does not exist' });
            return;
        }
        const event = yield events_services_1.eventsServices.deleteEvent(id);
        res.json({ msg: 'Successfully deleted event', ctx: event });
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ msg: 'Internal server error', ctx: [] });
    }
});
const getEventById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const event = yield events_services_1.eventsServices.getEventById(id);
        if (!event) {
            res.status(404).json({ msg: 'Event does not exist' });
            return;
        }
        res.json({ msg: 'Successfully retrieved event', ctx: event });
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ msg: 'Internal server error', ctx: [] });
    }
});
const getEventsByUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { user_id } = req.params;
        const events = yield events_services_1.eventsServices.getEventsByUser(user_id);
        res.json({ msg: 'Successfully retrieved events', ctx: events });
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ msg: 'Internal server error', ctx: [] });
    }
});
const getEventsByPlace = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { place_id } = req.params;
        const events = yield events_services_1.eventsServices.getEventsByPlace(place_id);
        res.json({ msg: 'Successfully retrieved events', ctx: events });
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ msg: 'Internal server error', ctx: [] });
    }
});
exports.eventsController = {
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
};
