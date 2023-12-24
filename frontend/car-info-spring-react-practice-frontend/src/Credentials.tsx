import { Buffer } from "buffer";

export type Credentials = { email: string, password: string };

export function checkCredentials(email: string, password: string, creds: Credentials) {
    if (email === creds.email && password === creds.password) {
        return true;
    } else {
        return false;
    }
}

export function encodePassword(creds: Credentials) {
    const combinedCreds = creds.email + ":" + creds.password;
    const encodedPassword = Buffer.from(combinedCreds).toString('Base64');
    return encodedPassword;
}