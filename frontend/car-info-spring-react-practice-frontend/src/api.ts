import axios from "axios";

const SERVER_URL = "http://localhost:8080";
const LOGIN_URL = SERVER_URL + "/login";

export async function login(email: string, password: string) {
    const response = await axios.post(LOGIN_URL, { email: email, password: password });
    return response;
}