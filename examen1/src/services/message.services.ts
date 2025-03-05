import 'dotenv/config'

import twilio from "twilio";

const client = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);

const sendMessage = async (to: string, body: string) => {
    try {
        await client.messages.create({
        body,
        from: process.env.TWILIO_PHONE_NUMBER,
        to: '+52' + to,
        });
    } catch (error) {
        console.error(error);
    }
}

export const messageServices = {
    sendMessage
}