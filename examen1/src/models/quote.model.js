"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Quote = void 0;
class Quote {
    constructor(quote) {
        this.id = quote.id;
        this.user_id = quote.user_id;
        this.place_id = quote.place_id;
        this.user = quote.user;
        this.place = quote.place;
        this.title = quote.title;
        this.date = quote.date;
        this.status = quote.status;
        this.estimated_price = quote.estimated_price;
        this.espected_advance = quote.espected_advance;
        this.is_on = quote.is_on;
        this.event = quote.event;
    }
}
exports.Quote = Quote;
