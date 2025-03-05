import {User, UserInterface} from "./user.model";
import {Place, PlaceInterface} from "./place.model";
import {Event} from "./event.model";

export interface quoteInterface {
    id: string,
    user_id: string,
    place_id: string,
    title: string,
    date: string,
    status?: 'pending' | 'accepted' | 'rejected',
    estimated_price?: number,
    espected_advance?: number,
    is_on: boolean
}


interface QuoteInterfaceModel {
    id?: string,
    user_id: string,
    place_id: string,
    user?: User | null,
    place?: Place | null,
    title: string,
    date: Date | string,
    status: 'pending' | 'accepted' | 'rejected',
    estimated_price: number | null,
    espected_advance: number | null,
    is_on: boolean,
    event?: Event | null
}

export class Quote{
    id?: string;
    user_id: string;
    place_id: string;
    user?: User | null;
    place?: Place | null;
    title: string;
    date: Date | string;
    status: 'pending' | 'accepted' | 'rejected';
    estimated_price: number | null;
    espected_advance: number | null;
    is_on: boolean;
    event?: Event | null;

    constructor(quote: QuoteInterfaceModel) {
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