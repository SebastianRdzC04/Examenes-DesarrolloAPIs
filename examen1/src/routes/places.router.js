"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const places_controller_1 = require("../controllers/places.controller");
const places_validator_1 = require("../middlewares/validators/places.validator");
const router = express_1.default.Router();
router.get('/', places_controller_1.placesController.getAllPlaces);
router.get('/:id', places_validator_1.placesValidator.validateId, places_controller_1.placesController.getPlace);
router.post('/', places_validator_1.placesValidator.validateData, places_controller_1.placesController.createPlace);
router.put('/update/:id', places_validator_1.placesValidator.validateId, places_validator_1.placesValidator.validateData, places_controller_1.placesController.updatePlace);
router.delete('/delete/:id', places_validator_1.placesValidator.validateId, places_controller_1.placesController.deletePlace);
exports.default = router;
