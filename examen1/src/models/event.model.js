"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Event = void 0;
class Event {
    constructor(event) {
        this.quote_id = event.quote_id;
        this.user_id = event.user_id;
        this.user = event.user;
        this.quote = event.quote;
        this.description = event.description;
        this.status = event.status;
        this.date = event.date;
        this.time_toStart = event.time_toStart;
        this.time_toEnd = event.time_toEnd;
        this.place_id = event.place_id;
        this.place = event.place;
        this.total_price = event.total_price;
        this.total_payed = event.total_payed;
        this.total_debt = event.total_debt;
        this.is_on = event.is_on;
    }
}
exports.Event = Event;
