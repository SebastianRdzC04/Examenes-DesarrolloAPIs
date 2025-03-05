"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const quotes_controller_1 = require("../controllers/quotes.controller");
const quotes_validator_1 = require("../middlewares/validators/quotes.validator");
const router = express_1.default.Router();
router.post('/create', quotes_controller_1.quotesController.createQuote);
router.get('/:id', quotes_validator_1.quotesValidator.validateQuoteId, quotes_controller_1.quotesController.getQuote);
router.get('/date/:date', quotes_controller_1.quotesController.getQuotesByDate);
router.get('/place/:place_id', quotes_validator_1.quotesValidator.validatePlaceId, quotes_controller_1.quotesController.getQuotesByPlace);
router.get('/user/:user_id', quotes_validator_1.quotesValidator.validateUserId, quotes_controller_1.quotesController.getQuotesByUser);
router.delete('/cancel/:id', quotes_validator_1.quotesValidator.validateQuoteId, quotes_controller_1.quotesController.cancelQuote);
router.post('/:id/admin', quotes_validator_1.quotesValidator.validateQuoteId, quotes_validator_1.quotesValidator.validateQuoteDataAdmin, quotes_controller_1.quotesController.updateQuoteAdmin);
router.post('/:id/update', quotes_validator_1.quotesValidator.validateQuoteId, quotes_validator_1.quotesValidator.validateQuoteDataUser, quotes_controller_1.quotesController.updateQuoteUser);
exports.default = router;
