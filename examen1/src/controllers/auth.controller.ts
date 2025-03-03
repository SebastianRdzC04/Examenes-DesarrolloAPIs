import {Request, Response} from 'express';
import bcrypt from 'bcrypt';
import {usersServices} from "../services/users.services";
import {UserInterface} from "../models/user.model";
import {body, validationResult, matchedData} from "express-validator";
import {rolesServices} from "../services/roles.services";

const register = async (req: Request, res: Response) => {
    const {data} = matchedData(req, {locations: ['body']});

    if (!data) {
        res.status(400).json({msg: 'Data does not exist', err: data});
        return
    }
    const userExisting = await usersServices.getUserByPhone(data.phone);
    if (userExisting) {
        res.status(400).json({msg: 'User already exists', ctx: []});
        return
    }
    const hashedPassword = await bcrypt.hash(data.password, 10);
    const role = await rolesServices.getRoleByName('user');
    const userToCreate: UserInterface = {
        ...data,
        role_id: "4d051d19-b7bf-4609-a344-612fe1ec8f51",
        password: hashedPassword
    };
    try {
        const user = await usersServices.createUser(userToCreate);
        res.json({msg: 'User created', ctx: [user]});
    } catch (err) {
        console.error(err);
        res.status(500).json({msg: 'Internal server error', ctx: []});
    }
}

const login = async (req: Request, res: Response) => {
    const {phone, password} = matchedData(req, {locations: ['body']});
    const user = await usersServices.getUserByPhone(phone);
    if (!user) {
        res.status(404).json({msg: 'User not found', ctx: []});
        return
    }
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
        res.status(400).json({msg: 'Invalid credentials', ctx: []});
        return
    }
    res.json({msg: 'Login successful', ctx: [user]});
}

export const authController = {
    register,
    login,
}