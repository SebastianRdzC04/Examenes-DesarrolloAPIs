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
exports.quotesController = void 0;
const express_validator_1 = require("express-validator");
const quotes_services_1 = require("../services/quotes.services");
const payment_services_1 = require("../services/payment.services");
const events_services_1 = require("../services/events.services");
const createQuote = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const id = (_a = req.user) === null || _a === void 0 ? void 0 : _a.id;
        const { data } = (0, express_validator_1.matchedData)(req, { locations: ['body'] });
        const quoteData = Object.assign(Object.assign({}, data), { user_id: id });
        const quote = yield quotes_services_1.quotesServices.createQuote(quoteData);
        res.status(201).json({ msg: 'Successfully created quote', ctx: quote });
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ msg: 'Internal server error', ctx: err });
    }
});
const updateQuoteAdmin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const { data } = (0, express_validator_1.matchedData)(req, { locations: ['body'] });
        console.log(data);
        const quoteExisting = yield quotes_services_1.quotesServices.getQuoteById(id);
        if (!quoteExisting) {
            res.status(404).json({ msg: 'Quote does not exist' });
            return;
        }
        if (quoteExisting.status !== 'pending') {
            res.status(400).json({ msg: 'Quote is not pending' });
            return;
        }
        const quote = yield quotes_services_1.quotesServices.updateQuote(id, data);
        res.json({ msg: 'Successfully updated quote', ctx: quote });
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ msg: 'Internal server error', ctx: [] });
    }
});
const updateQuoteUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const { id } = req.params;
        const { data } = (0, express_validator_1.matchedData)(req, { locations: ['body'] });
        const quoteExisting = yield quotes_services_1.quotesServices.getQuoteById(id);
        if (!quoteExisting) {
            res.status(404).json({ msg: 'Quote does not exist' });
            return;
        }
        if (quoteExisting.status === 'rejected') {
            res.status(400).json({ msg: 'Quote is rejected' });
            return;
        }
        if (quoteExisting.user_id !== ((_a = req.user) === null || _a === void 0 ? void 0 : _a.id)) {
            res.status(403).json({ msg: 'You are not allowed to update this quote' });
            return;
        }
        const quote = yield quotes_services_1.quotesServices.updateQuote(id, data);
        res.json({ msg: 'Successfully updated quote', ctx: quote });
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ msg: 'Internal server error', ctx: [] });
    }
});
const cancelQuote = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const quoteExisting = yield quotes_services_1.quotesServices.getQuoteById(id);
        if (!quoteExisting) {
            res.status(404).json({ msg: 'Quote does not exist' });
            return;
        }
        if (quoteExisting.status !== 'pending') {
            res.status(400).json({ msg: 'Quote is not pending' });
            return;
        }
        const quote = yield quotes_services_1.quotesServices.cancelQuote(id);
        res.json({ msg: 'Successfully canceled quote', ctx: quote });
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ msg: 'Internal server error', ctx: [] });
    }
});
const getQuote = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const quote = yield quotes_services_1.quotesServices.getQuoteById(id);
    if (!quote) {
        res.status(404).json({ msg: 'Quote does not exist', ctx: [] });
        return;
    }
    res.json({ msg: 'Quote', ctx: [quote] });
    return;
});
const getQuotesByDate = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { date } = req.params;
    const quotes = yield quotes_services_1.quotesServices.getQuotesByDate(date);
    res.json({ msg: 'Quotes by date', ctx: quotes });
    return;
});
const getQuotesByPlace = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { place_id } = req.params;
    const quotes = yield quotes_services_1.quotesServices.getQuotesByPlace(place_id);
    res.json({ msg: 'Quotes by place', ctx: quotes });
    return;
});
const getQuotesByUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { user_id } = req.params;
    const quotes = yield quotes_services_1.quotesServices.getQuotesByUser(user_id);
    res.json({ msg: 'Quotes by user', ctx: quotes });
    return;
});
const payQuote = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    try {
        const { id } = req.params;
        const { amount, paymentId } = req.body;
        const quoteExisting = yield quotes_services_1.quotesServices.getQuoteById(id);
        if (!quoteExisting) {
            res.status(404).json({ msg: 'Quote does not exist' });
            return;
        }
        if (quoteExisting.status !== 'pending') {
            res.status(400).json({ msg: 'Quote is not valid' });
            return;
        }
        if (!quoteExisting.espected_advance) {
            res.status(400).json({ msg: 'Quote does not have an expected advance' });
            return;
        }
        if (quoteExisting.espected_advance > amount) {
            res.status(400).json({ msg: 'Amount is not enough' });
            return;
        }
        const quote = yield quotes_services_1.quotesServices.acceptQuote(id);
        try {
            const dataToPayment = {
                phone: (_a = quote.user) === null || _a === void 0 ? void 0 : _a.phone,
                place: (_b = quote.place) === null || _b === void 0 ? void 0 : _b.name,
                date: quote.date.toString(),
                time: '20:00'
            };
            yield payment_services_1.paymentServices.createPaymentIntent(amount, paymentId, dataToPayment);
        }
        catch (err) {
            console.error(err);
            res.status(500).json({ msg: 'Internal server error', ctx: [] });
            return;
        }
        const eventData = {
            date: quote.date.toString(),
            place_id: quote.place_id,
            quote_id: id,
            user_id: quote.user_id,
            description: '',
            total_payed: amount,
            total_price: quote.estimated_price,
            total_debt: quote.estimated_price - amount,
            time_toStart: '20:00'
        };
        const event = yield events_services_1.eventsServices.createEvent(eventData);
        res.json({ msg: 'Successfully paid quote', ctx: quote });
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ msg: 'Internal server error', ctx: [] });
    }
});
exports.quotesController = {
    createQuote,
    updateQuoteAdmin,
    updateQuoteUser,
    cancelQuote,
    getQuote,
    getQuotesByDate,
    getQuotesByPlace,
    getQuotesByUser,
    payQuote
};
