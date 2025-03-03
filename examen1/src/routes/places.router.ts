import express from 'express';
import {placesController} from "../controllers/places.controller";
import {placesValidator} from "../middlewares/validators/places.validator";

const router = express.Router()

router.get('/',
    placesController.getAllPlaces)

router.get('/:id',
    placesValidator.validateId,
    placesController.getPlace)

router.post('/',
    placesValidator.validateData,
    placesController.createPlace)

router.put('/update/:id',
    placesValidator.validateId,
    placesValidator.validateData,
    placesController.updatePlace)

router.delete('/delete/:id',
    placesValidator.validateId,
    placesController.deletePlace)

export default router