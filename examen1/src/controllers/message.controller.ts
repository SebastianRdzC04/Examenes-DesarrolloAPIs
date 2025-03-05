import {Request, Response} from "express";
import {body, validationResult, matchedData, param} from "express-validator";
import {messageServices} from "../services/message.services";

const sendMessage = async (req: Request, res: Response) => {
    try {
        //const {data} = matchedData(req, {locations: ['body']});
        const {data} = req.body
        await messageServices.sendMessage(data.to, data.body);
        res.status(200).json({msg: 'Message sent successfully'});
    } catch (err) {
        console.error(err);
        res.status(500).json({msg: 'Internal server error', ctx: err});
    }
}

export const messageController = {
    sendMessage
}