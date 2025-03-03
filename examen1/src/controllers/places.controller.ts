import {Request, Response} from "express";
import {placesServices} from "../services/places.services";
import {body, validationResult, matchedData, param} from "express-validator";
import {PlaceInterface} from "../models/place.model";

const getAllPlaces = async (req: Request, res: Response) => {
    const places = await placesServices.getAllPlaces();
    res.json({msg: 'All places', ctx: [places]});
    return
}
const getPlace = async (req: Request, res: Response) => {
    const {id} = req.params;
    const place = await placesServices.getPlaceById(id);
    if (!place) {
        res.status(404).json({msg: 'Place does not exist', ctx: []});
        return
    }
    res.json({msg: 'Place', ctx: [place]});
    return
}

const createPlace = async (req: Request, res: Response) => {
    try {
        const {data} = matchedData(req, {locations: ['body']}) as {data: PlaceInterface};

        const place = await placesServices.createPlace(data);

        res.status(201).json({msg: 'Successfully created place', ctx: place});

    } catch (err) {
        console.error(err);
        res.status(500).json({msg: 'Internal server error', ctx: err});
    }
}

const updatePlace = async (req: Request, res: Response) => {
    try {
        const {id} = req.params;
        const {data} = matchedData(req, {locations: ['body']});

        const placeExisting = await placesServices.getPlaceById(id);

        if (!placeExisting) {
            res.status(404).json({msg: 'Place does not exist'});
            return
        }

        const place = await placesServices.updatePlace(id, data);

        res.json({msg: 'Successfully updated place', ctx: place});

    } catch (err) {
        console.error(err);
        res.status(500).json({msg: 'Internal server error', ctx: []});
    }
}

const deletePlace = async (req: Request, res: Response) => {
    try {
        const {id} = req.params;

        const placeExisting = await placesServices.getPlaceById(id);

        if (!placeExisting) {
            res.status(400).json({msg: 'Place does not exist', ctx: []});
            return
        }

        const place = await placesServices.deletePlace(id);

        res.json({msg: 'Successfully deleted place', ctx: place});

    } catch (err) {
        console.error(err);
        res.status(500).json({msg: 'Internal server error', ctx: []});
    }
}

export const placesController = {
    getAllPlaces,
    getPlace,
    createPlace,
    updatePlace,
    deletePlace,
}