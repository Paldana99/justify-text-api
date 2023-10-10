import {createClient} from 'redis';
import 'dotenv/config'

require('dotenv').config()

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

export async function PostToken(mail: string) {
    await client.connect()
    let old_token = await client.get(mail)
    console.log(old_token)
    if (old_token) {
        await client.disconnect()
        return old_token
    }
    let token = generateToken(32)
    await client.set(mail, token)
    await client.disconnect()
    return token
}
