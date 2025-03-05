import {User} from "./user.model";
import {Quote} from "./quote.model";
import {Place} from "./place.model";

export interface EventInterface {
    user_id: string,
    quote_id: string,
    description: string,
    status?: 'pending'| 'on process'| 'cancelled'| 'done',
    date: string ,
    time_toStart: string,
    time_toEnd?: string | null,
    place_id: string,
    total_price: number,
    total_payed: number,
    total_debt: number,
    is_on?: boolean
}

interface EventModel {
    quote_id: string,
    user_id: string,
    user?: User | null,
    quote?: Quote | null,
    description: string,
    status: 'pending'| 'on process'| 'cancelled'| 'done',
    date: string,
    time_toStart: string,
    time_toEnd: string | null,
    place_id: string,
    place?: Place | null,
    total_price: number,
    total_payed: number,
    total_debt: number,
    is_on: boolean
}

export class Event{
    quote_id: string;
    user_id: string;
    user?: User | null;
    quote?: Quote | null;
    description: string;
    status: 'pending'| 'on process'| 'cancelled'| 'done';
    date: string;
    time_toStart: string;
    time_toEnd: string | null;
    place_id: string;
    place?: Place | null;
    total_price: number;
    total_payed: number;
    total_debt: number;
    is_on: boolean;

    constructor(event: EventModel) {
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