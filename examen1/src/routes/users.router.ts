import express from 'express'
import {userController} from "../controllers/user.controller";
import {usersValidator} from "../middlewares/validators/users.validator";

const router = express.Router()

router.get('/all',
    userController.getAllUsers)

router.get('/:id',
    usersValidator.validateId,
    userController.getUserById)

router.get('/phone/:number',
    usersValidator.validatePhone,
    userController.getUserByPhone)

router.delete('/:id',
    usersValidator.validateId,
    userController.deleteUser)

export default router