import { useState } from "react";
import { Credentials } from "./Credentials";
import { createPerson } from "./api";

export type Props = { creds: Credentials; onCreation: (openAdminPage: boolean) => void; onBack: () => void };

export function CreatePersonPage(props: Props) {
    const [createPageIsOpen, setCreateUserPageIsOpen] = useState(true);
    const [errorOccurred, setErrorOccurred] = useState(false);

    const [firstName, setFirstName] = useState("");
    const [secondName, setSecondName] = useState("");
    const [birthDate, setBirthDate] = useState("");
    const [address, setAddress] = useState("");
    const [houseNumber, setHouseNumber] = useState("");
    const [areaCode, setAreaCode] = useState("");
    const [area, setArea] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [salutation, setSalution] = useState("");
    const [company, setCompany] = useState("");

    async function handleUserCreation() {
        try {
            await createPerson(props.creds, firstName, secondName, birthDate, address, houseNumber, areaCode, area,
                email, password, salutation, company);
            props.onCreation(true);
        } catch {
            handleErrorOccurred();
        }
    }

    function handleErrorOccurredWarning() {
        return (
            <div>
                <p>Error occurred, please try again!</p>
                <button onClick={ backFromError }>Back</button>
            </div>
        )
    }

    function handleErrorOccurred() {
        setCreateUserPageIsOpen(false);
        setErrorOccurred(true);
    }

    function backFromError() {
        setErrorOccurred(false);
        setCreateUserPageIsOpen(true);
    }

    return (
        <>
            { createPageIsOpen ?
                <>
                    <h2>Create person</h2>
                    <p>Mandatory fields</p>
                    <input type="text" placeholder="First name" value={ firstName }
                        onChange={ event => setFirstName(event.target.value) } /><br />
                    <input type="text" placeholder="Second name" value={ secondName }
                        onChange={ event => setSecondName(event.target.value) } /><br />
                    <input type="text" placeholder="Birth date (YYYY-MM-DD)" value={ birthDate }
                        onChange={ event => setBirthDate(event.target.value) } /><br />
                    <input type="text" placeholder="Address" value={ address }
                        onChange={ event => setAddress(event.target.value) } /><br />
                    <input type="text" placeholder="House number" value={ houseNumber }
                        onChange={ event => setHouseNumber(event.target.value) } /><br />
                    <input type="text" placeholder="Area code" value={ areaCode }
                        onChange={ event => setAreaCode(event.target.value )} /><br />
                    <input type="text" placeholder="Area" value={ area }
                        onChange={ event => setArea(event.target.value) } /><br />
                    <input type="text" placeholder="Mail" value={ email }
                        onChange={ event => setEmail(event.target.value) } /><br />
                    <input type="text" placeholder="Password" value={ password }
                        onChange={ event => setPassword(event.target.value) } /><br />

                    <p>Optional fields</p>
                    <input type="text" placeholder="Salutation" value={ salutation }
                        onChange={ event => setSalution(event.target.value) } /><br />
                    <input type="text" placeholder="Company" value={ company }
                        onChange={ event => setCompany(event.target.value) } /><br /><br />

                    <button
                        disabled={firstName === "" || secondName === "" || birthDate === "" || address === "" ||
                            houseNumber === "" || areaCode === "" || area === "" || email === "" || password === ""}
                        onClick={ handleUserCreation }
                    > Submit
                    </button>
                    <button onClick={ props.onBack }>Back</button>
                </> : null }

            { errorOccurred ? handleErrorOccurredWarning() : null }
        </>
    )
}