import express from 'express'

import {eventsController} from "../controllers/events.controller";
import {eventsValidator} from "../middlewares/validators/events.validator";

const router = express.Router()

router.post('/create',
    eventsValidator.validateDataToCreate,
    eventsController.createEvent)

router.get('/:id',
    eventsValidator.validateEventId,
    eventsController.getEventById)

router.get('/user/:user_id',
    eventsValidator.validateUserId,
    eventsController.getEventsByUser)

router.get('/place/:place_id',
    eventsValidator.validatePlaceId,
    eventsController.getEventsByPlace)

router.delete('/:id',
    eventsValidator.validateEventId,
    eventsController.deleteEvent)

router.post('start/:id',
    eventsValidator.validateEventId,
    eventsController.startEvent)

router.post('finish/:id',
    eventsValidator.validateEventId,
    eventsController.finishEvent)

router.post('cancel/:id',
    eventsValidator.validateEventId,
    eventsController.cancelEvent)

router.post('update/:id/admin',
    eventsValidator.validateEventId,
    eventsValidator.validateDataAdmin,
    eventsController.updateEventAdmin)

router.post('update/:id/user',
    eventsValidator.validateEventId,
    eventsValidator.validateDataUser,
    eventsController.updateEventUser)

export default router