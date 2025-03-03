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
exports.placesController = void 0;
const places_services_1 = require("../services/places.services");
const express_validator_1 = require("express-validator");
const getAllPlaces = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const places = yield places_services_1.placesServices.getAllPlaces();
    res.json({ msg: 'All places', ctx: [places] });
    return;
});
const getPlace = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const place = yield places_services_1.placesServices.getPlaceById(id);
    if (!place) {
        res.status(404).json({ msg: 'Place does not exist', ctx: [] });
        return;
    }
    res.json({ msg: 'Place', ctx: [place] });
    return;
});
const createPlace = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { data } = (0, express_validator_1.matchedData)(req, { locations: ['body'] });
        const place = yield places_services_1.placesServices.createPlace(data);
        res.status(201).json({ msg: 'Successfully created place', ctx: place });
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ msg: 'Internal server error', ctx: err });
    }
});
const updatePlace = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const { data } = (0, express_validator_1.matchedData)(req, { locations: ['body'] });
        const placeExisting = yield places_services_1.placesServices.getPlaceById(id);
        if (!placeExisting) {
            res.status(404).json({ msg: 'Place does not exist' });
            return;
        }
        const place = yield places_services_1.placesServices.updatePlace(id, data);
        res.json({ msg: 'Successfully updated place', ctx: place });
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ msg: 'Internal server error', ctx: [] });
    }
});
const deletePlace = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const placeExisting = yield places_services_1.placesServices.getPlaceById(id);
        if (!placeExisting) {
            res.status(400).json({ msg: 'Place does not exist', ctx: [] });
            return;
        }
        const place = yield places_services_1.placesServices.deletePlace(id);
        res.json({ msg: 'Successfully deleted place', ctx: place });
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ msg: 'Internal server error', ctx: [] });
    }
});
exports.placesController = {
    getAllPlaces,
    getPlace,
    createPlace,
    updatePlace,
    deletePlace,
};
