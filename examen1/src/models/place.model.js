"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Place = void 0;
class Place {
    constructor(place) {
        this.id = place.id;
        this.name = place.name;
        this.description = place.description;
        this.max_capacity = place.max_capacity;
        this.is_on = place.is_on;
    }
}
exports.Place = Place;
