import express from 'express'
import {authController} from "../controllers/auth.controller";
import {authValidator} from "../middlewares/validators/auth.validator";

const router = express.Router()

router.post('/register',
    authValidator.validateRegisterData,
    authController.register)

router.post('/login',
    authValidator.validateLoginData,
    authController.login)

export default router