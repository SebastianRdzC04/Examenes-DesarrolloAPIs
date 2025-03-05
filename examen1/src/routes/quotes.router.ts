import express from 'express'

import {quotesController} from "../controllers/quotes.controller";
import {quotesValidator} from "../middlewares/validators/quotes.validator";

const router = express.Router()

router.post('/create',
    quotesController.createQuote)

router.get('/:id',
    quotesValidator.validateQuoteId,
    quotesController.getQuote)

router.get('/date/:date',
    quotesController.getQuotesByDate)

router.get('/place/:place_id',
    quotesValidator.validatePlaceId,
    quotesController.getQuotesByPlace)

router.get('/user/:user_id',
    quotesValidator.validateUserId,
    quotesController.getQuotesByUser)

router.delete('/cancel/:id',
    quotesValidator.validateQuoteId,
    quotesController.cancelQuote)

router.post('/:id/admin',
    quotesValidator.validateQuoteId,
    quotesValidator.validateQuoteDataAdmin,
    quotesController.updateQuoteAdmin)

router.post('/:id/update',
    quotesValidator.validateQuoteId,
    quotesValidator.validateQuoteDataUser,
    quotesController.updateQuoteUser)

export default router