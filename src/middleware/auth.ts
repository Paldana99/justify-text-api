import {kv} from "@vercel/kv";

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
    return await kv.get(mail)
}

export async function PostToken(mail: string) {
    let token = generateToken(32)
    await kv.set(token, mail)
    return token
}
