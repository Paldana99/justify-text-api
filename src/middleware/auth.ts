import {createClient} from 'redis';
import {NextFunction, Request, Response} from 'express';
import 'dotenv/config'

require('dotenv').config()

const MAXIMUM_CHAR_REQUEST: number = 80000

const client = createClient({
    password: process.env.REDIS_PASSWORD,
    socket: {
        host: process.env.REDIS_URL,
        port: 14117
    }
});

function generateToken(length: number) {
    const charset = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let token = '';
    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * charset.length);
        token += charset[randomIndex];
    }
    return token;
}

export async function GetToken(mail: string) {
    await client.connect()
    let token = await client.get(mail)
    await client.disconnect()
    return token
}

async function PostToken(mail: string) {
    await client.connect()
    let old_token = await client.get(mail)
    // If toke exist already, then we recover that one
    if (old_token) {
        await client.disconnect()
        return old_token
    }
    let token = generateToken(32)
    await client.set(mail, token)

    // See how many second until the end of the day
    const now = new Date();
    const endOfDay = new Date(now);
    endOfDay.setHours(23, 59, 59, 999); // Set to 23:59:59.999
    const millisecondsUntilEndOfDay = endOfDay.getTime() - now.getTime();
    const secondsUntilEndOfDay = Math.floor(millisecondsUntilEndOfDay / 1000);
    // Set a new count for that token
    await client.set(token, 0, {'EX': secondsUntilEndOfDay})
    await client.disconnect()
    return token
}

export async function GetCount(token: string) {
    await client.connect()
    let count = parseInt(<string>await client.get(token));
    await client.disconnect()
    return count
}

export async function UpdateCount(token: string, newCount: number) {
    await client.connect()
    await client.set(token, newCount)
    await client.disconnect()
}

const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
    let token: string | undefined = req.headers['token'] as string | undefined
    if (!token) {
        res.status(401).json({error: 'Token is missing'});
        return
    }
    GetCount(token).then((count) => {
        if (count == null) {
            res.status(401).json({error: 'Token is missing'})
            return
        }
        let numberChars: number = req.body.length
        if (count + numberChars > MAXIMUM_CHAR_REQUEST) {
            res.status(402).send("Payment Required")
            return
        }
        UpdateCount(token as string, count + numberChars)
        return next()
    }).catch((error) => {
        res.status(500).json({error: error})
    })
}

module.exports = {
    authMiddleware,
    PostToken
}
