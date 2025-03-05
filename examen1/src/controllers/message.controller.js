"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.messageController = void 0;
const message_services_1 = require("../services/message.services");
const sendMessage = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        //const {data} = matchedData(req, {locations: ['body']});
        const { data } = req.body;
        yield message_services_1.messageServices.sendMessage(data.to, data.body);
        res.status(200).json({ msg: 'Message sent successfully' });
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ msg: 'Internal server error', ctx: err });
    }
});
exports.messageController = {
    sendMessage
};
