import axios from "axios";
import { Credentials, encodePassword } from "./Credentials";

const SERVER_URL = "http://localhost:8080";
const LOGIN_URL = SERVER_URL + "/login";
const CARS_URL = SERVER_URL + "/cars"
const PERSONS_URL = SERVER_URL + "/persons"

export type Car = {
    id: number, model: string, brand: string, indicator: string, modelFamily: string, launchDate: string,
    modelYear: number, developmentType: string, modelStatus: string, segment: string, carBodyType: string,
    carBodySpecification: string, engineType: string, carProject: string, limitation: string, uuid: string;
    sisterModelOne: string, sisterModelTwo: string, modelType: string, baseCar: string
}

export type Person = {
    id: number, salutation: string, firstName: string, secondName: string, birthDate: string,
    address: string, houseNumber: string, areaCode: string, area: string, email: string, deactivated: boolean,
    dateOfEntry: number, company: string, password: string, car: Car
};

export async function login(email: string, password: string) {
    const response = await axios.post(LOGIN_URL, { email: email, password: password });
    return response;
}

export async function getCarInfoByFullTextSearch(creds: Credentials, text: string, id: string, model: string, brand: string,
    indicator: string, modelFamily: string, launchDate: string, modelYear: string, developmentType: string,
    modelStatus: string, segment: string, carBodyType: string, carBodySpecification: string, engineType: string,
    carProject: string, limitation: string, uuid: string, sisterModelOne: string, sisterModelTwo: string,
    modelType: string, baseCar: string) {

    let FINAL_URL = CARS_URL + "/search";

    if (text !== "") {
        FINAL_URL = FINAL_URL + "?text=" + text + "&";
    } else {
        FINAL_URL = FINAL_URL + "?text&"
    }

    if (id !== "") {
        FINAL_URL = FINAL_URL + "id=" + id + "&";
    } else {
        FINAL_URL = FINAL_URL + "id&"
    }

    if (model !== "") {
        FINAL_URL = FINAL_URL + "model=" + model + "&";
    } else {
        FINAL_URL = FINAL_URL + "model&"
    }

    if (brand !== "") {
        FINAL_URL = FINAL_URL + "brand=" + brand + "&";
    } else {
        FINAL_URL = FINAL_URL + "brand&";
    }

    if (indicator !== "") {
        FINAL_URL = FINAL_URL + "indicator=" + indicator + "&";
    } else {
        FINAL_URL = FINAL_URL + "indicator&"
    }

    if (modelFamily !== "") {
        FINAL_URL = FINAL_URL + "modelFamily=" + modelFamily + "&";
    } else {
        FINAL_URL = FINAL_URL + "modelFamily&"
    }

    if (launchDate !== "") {
        FINAL_URL = FINAL_URL + "launchDate=" + launchDate + "&";
    } else {
        FINAL_URL = FINAL_URL + "launchDate&"
    }

    if (modelYear !== "") {
        FINAL_URL = FINAL_URL + "modelYear=" + modelYear + "&";
    } else {
        FINAL_URL = FINAL_URL + "modelYear&"
    }

    if (developmentType !== "") {
        FINAL_URL = FINAL_URL + "developmentType=" + developmentType + "&";
    } else {
        FINAL_URL = FINAL_URL + "developmentType&"
    }

    if (modelStatus !== "") {
        FINAL_URL = FINAL_URL + "modelStatus=" + modelStatus + "&";
    } else {
        FINAL_URL = FINAL_URL + "modelStatus&"
    }

    if (segment !== "") {
        FINAL_URL = FINAL_URL + "segment=" + segment + "&";
    } else {
        FINAL_URL = FINAL_URL + "segment&"
    }

    if (carBodyType !== "") {
        FINAL_URL = FINAL_URL + "carBodyType=" + carBodyType + "&";
    } else {
        FINAL_URL = FINAL_URL + "carBodyType&"
    }

    if (carBodySpecification !== "") {
        FINAL_URL = FINAL_URL + "carBodySpec=" + carBodySpecification + "&";
    } else {
        FINAL_URL = FINAL_URL + "carBodySpec&"
    }

    if (engineType !== "") {
        FINAL_URL = FINAL_URL + "engineType=" + engineType + "&";
    } else {
        FINAL_URL = FINAL_URL + "engineType&"
    }

    if (carProject !== "") {
        FINAL_URL = FINAL_URL + "carProject=" + carProject + "&";
    } else {
        FINAL_URL = FINAL_URL + "carProject&"
    }

    if (limitation !== "") {
        FINAL_URL = FINAL_URL + "limitation=" + limitation + "&";
    } else {
        FINAL_URL = FINAL_URL + "limitation&"
    }

    if (uuid !== "") {
        FINAL_URL = FINAL_URL + "uuid=" + uuid + "&";
    } else {
        FINAL_URL = FINAL_URL + "uuid&"
    }

    if (sisterModelOne !== "") {
        FINAL_URL = FINAL_URL + "sisterModelOne=" + sisterModelOne + "&";
    } else {
        FINAL_URL = FINAL_URL + "sisterModelOne&"
    }

    if (sisterModelTwo !== "") {
        FINAL_URL = FINAL_URL + "sisterModelTwo=" + sisterModelTwo + "&";
    } else {
        FINAL_URL = FINAL_URL + "sisterModelTwo&"
    }

    if (modelType !== "") {
        FINAL_URL = FINAL_URL + "modelType=" + modelType + "&";
    } else {
        FINAL_URL = FINAL_URL + "modelType&"
    }

    if (baseCar !== "") {
        FINAL_URL = FINAL_URL + "baseCar=" + baseCar;
    } else {
        FINAL_URL = FINAL_URL + "baseCar";
    }

    const response = await axios.get<Car[]>(FINAL_URL,
        { headers: { 'Authorization': 'Basic ' + encodePassword(creds) } });
    return response;
}

export async function getAllPersons(creds: Credentials) {
    const responsePers = await axios.get<Person[]>(PERSONS_URL,
        { headers: { 'Authorization': 'Basic ' + encodePassword(creds) } });
    return responsePers;
}

export async function getPersonByEmail(creds: Credentials, email: string) {
    const response = await axios.get<Person>(PERSONS_URL + "/email/" + email,
        { headers: { 'Authorization': 'Basic ' + encodePassword(creds) } });
    return response;
}

export async function editPersonData(creds: Credentials, id: string, firstName: string, secondName: string, birthDate: string,
    address: string, houseNumber: string, areaCode: string, area: string, email: string, password: string,
    salutation: string, company: string) {

    let FINAL_URL = PERSONS_URL + "?id=" + id + "&" +
        "firstName=" + firstName + "&" +
        "secondName=" + secondName + "&" +
        "birthDate=" + birthDate + "&" +
        "address=" + address + "&" +
        "houseNumber=" + houseNumber + "&" +
        "areaCode=" + areaCode + "&" +
        "area=" + area + "&" +
        "email=" + email + "&" +
        "password=" + password + "&";

    if (salutation !== "") {
        FINAL_URL = FINAL_URL + "salutation=" + salutation + "&";
    } else {
        FINAL_URL = FINAL_URL + "salutation&"
    }

    if (company !== "") {
        FINAL_URL = FINAL_URL + "company=" + company;
    } else {
        FINAL_URL = FINAL_URL + "company";
    }

    const response = await axios.put(FINAL_URL,
        { headers: { 'Authorization': 'Basic ' + encodePassword(creds) } });
    return response;
}

export async function createPerson(creds: Credentials, firstName: string, secondName: string, birthDate: string,
    address: string, houseNumber: string, areaCode: string, area: string, email: string, password: string,
    salutation: string, company: string) {

    let FINAL_URL = PERSONS_URL + "?firstName=" + firstName + "&" +
        "secondName=" + secondName + "&" +
        "birthDate=" + birthDate + "&" +
        "address=" + address + "&" +
        "houseNumber=" + houseNumber + "&" +
        "areaCode=" + areaCode + "&" +
        "area=" + area + "&" +
        "email=" + email + "&" +
        "password=" + password + "&";

    if (salutation !== "") {
        FINAL_URL = FINAL_URL + "salutation=" + salutation + "&";
    } else {
        FINAL_URL = FINAL_URL + "salutation=k.A.&"
    }

    if (company !== "") {
        FINAL_URL = FINAL_URL + "company=" + company;
    } else {
        FINAL_URL = FINAL_URL + "company=k.A.";
    }

    const response = await axios.post(FINAL_URL,
        { headers: { 'Authorization': 'Basic ' + encodePassword(creds) } });
    return response;
}

export async function deletePerson(creds: Credentials, email: string) {
    const response = await axios.delete(PERSONS_URL + "/" + email,
        { headers: { 'Authorization': 'Basic ' + encodePassword(creds) } });
    return response;
}