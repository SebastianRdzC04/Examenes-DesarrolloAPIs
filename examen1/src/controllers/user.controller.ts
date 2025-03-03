import {Request, Response} from 'express';
import {usersServices} from "../services/users.services";
import {body, validationResult, matchedData} from "express-validator";


const getAllUsers = async (req: Request, res: Response) => {
    const users = await usersServices.getAllUsers();
    res.json({msg: 'All users', ctx: [users]});
    return
}

const getUserById = async (req: Request, res: Response) => {
    const {id} = req.params;
    try {
        const user = await usersServices.getUserById(id);
        if (!user) {
            res.status(404).json({msg: 'User not found', ctx: []});
            return
        }
        res.json({msg: 'User by id', ctx: [user]});
    } catch (err) {
        res.status(500).json({msg: 'Internal server error', ctx: [], err});
    }
}

const getUserByPhone = async (req: Request, res: Response) => {
    const {number} = req.params;
    try {
        const user = await usersServices.getUserByPhone(number);
        if (!user) {
            res.status(404).json({msg: 'User not found', ctx: []});
            return
        }
        res.json({msg: 'User by phone', ctx: [user]});
    } catch (err) {
        res.status(500).json({msg: 'Internal server error', ctx: [], err});
    }
}


const updateUser = async (req: Request, res: Response) => {
    const {id, data} = matchedData(req, {locations: ['body']});
    try {
        const userExisting = await usersServices.getUserById(id);
        if (!userExisting) {
            res.status(400).json({msg: 'User does not exist', ctx: []});
            return
        }
        const user = await usersServices.updateUser(id, data);
        res.json({msg: 'User updated', ctx: [user]});
    } catch (err) {
        res.status(500).json({msg: 'Internal server error', ctx: [], err: err});
    }
}

const deleteUser = async (req: Request, res: Response) => {
    try {
        const {id} = req.params;
        const existingUser = await usersServices.getUserById(id);
        if (!existingUser) {
            res.status(400).json({msg: 'User does not exist', ctx: []});
            return
        }
        const user = await usersServices.deleteUser(id);
        res.json({msg: 'User deleted', ctx: [user]});
    } catch (err) {
        res.status(500).json({msg: 'Internal server error', ctx: [], err: err});
    }
}

export const userController = {
    getAllUsers,
    getUserById,
    updateUser,
    deleteUser,
    getUserByPhone,
}