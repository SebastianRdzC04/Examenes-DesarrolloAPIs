import {Request, Response} from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
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
    const role = await rolesServices.getRoleByName('client');
    const userToCreate: UserInterface = {
        ...data,
        role_id: role.id,
        password: hashedPassword
    };
    try {
        const user = await usersServices.createUser(userToCreate);
        console.log(user.role)
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
    const userRol = await rolesServices.getRoleById(user.role_id);
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
        res.status(400).json({msg: 'Invalid credentials', ctx: []});
        return
    }
    const token = jwt.sign({id: user.id, role: userRol.name}, process.env.JWT_KEY_SECRET as string, {expiresIn: '1h'});
    res.json({msg: 'Login successful', data: {token: token}});
}

export const authController = {
    register,
    login,
}