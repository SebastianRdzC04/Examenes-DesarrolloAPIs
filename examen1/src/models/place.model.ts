export interface PlaceInterface {
    id?: string,
    name: string,
    description: string,
    max_capacity: number,
    is_on: boolean
}

export class Place{
    id?: string;
    name: string;
    description: string;
    max_capacity: number;
    is_on: boolean;

    constructor(place: PlaceInterface) {
        this.id = place.id;
        this.name = place.name;
        this.description = place.description;
        this.max_capacity = place.max_capacity;
        this.is_on = place.is_on;
    }
}