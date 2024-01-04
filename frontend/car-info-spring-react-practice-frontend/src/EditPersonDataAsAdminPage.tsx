import { useState } from "react";
import { getPersonByEmail, editPersonData } from "./api";
import { Credentials } from "./Credentials";

export type Props = { creds: Credentials; onEdit: (openAdminPage: boolean) => void; onBack: () => void };

export function EditPersonDataAsAdminPage(props: Props) {
    const [searchPartIsOpen, setSearchPartIsOpen] = useState(true);
    const [enteringDataPartIsOpen, setEnteringDataPartIsOpen] = useState(false);

    const [id, setId] = useState("");
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
    const [emailEnteredByAdmin, setEmailEnteredByAdmin] = useState("");
    const [errorOccurred, setErrorOccurred] = useState(false);

    function handleClickOnSearchUser() {
        getPersonByEmail(props.creds, emailEnteredByAdmin).then(body => {
            if (body.data) {
                setId(body.data.id.toString());
                setFirstName(body.data.firstName);
                setSecondName(body.data.secondName);
                setBirthDate(body.data.birthDate);
                setAddress(body.data.address);
                setHouseNumber(body.data.houseNumber);
                setAreaCode(body.data.areaCode);
                setArea(body.data.area);
                setSalution(body.data.salutation);
                setCompany(body.data.company);
                setEmail(body.data.email);
                setPassword(body.data.password);
                setSearchPartIsOpen(false);
                setEnteringDataPartIsOpen(true);
            } else {
                handleErrorOccurred();
            }
        });
    }

    function handleUserDataEdit() {
        editPersonData(props.creds, id, firstName, secondName, birthDate, address, houseNumber, areaCode, area,
            email, password, salutation, company).catch(handleErrorOccurred);
        props.onEdit(true);
    }

    function showErrorOccurredWarning() {
        return (
            <div>
                <p>Error occurred, please try again!</p>
                <button onClick={backFromError}>Back</button>
            </div>
        )
    }

    function handleErrorOccurred() {
        setEmailEnteredByAdmin("");
        setSearchPartIsOpen(false);
        setEnteringDataPartIsOpen(false);
        setErrorOccurred(true);
    }

    function backFromError() {
        setErrorOccurred(false);
        setSearchPartIsOpen(true);
    }

    function backFromEnteringData() {
        setEmailEnteredByAdmin("");
        setEnteringDataPartIsOpen(false);
        setSearchPartIsOpen(true);
    }

    return (
        <>
            {searchPartIsOpen ?
                <>
                    <h2>Edit person data</h2>
                    <p>Please choose person by entering his/her mail:</p>
                    <input type="text" placeholder="Mail" value={ emailEnteredByAdmin }
                        onChange={(event) => setEmailEnteredByAdmin(event.target.value)} />
                    <button
                        disabled={emailEnteredByAdmin === ""}
                        onClick={handleClickOnSearchUser}
                    > Search person
                    </button>

                    <button onClick={props.onBack}>Back</button>

                </> : null}

            {enteringDataPartIsOpen ?
                <>
                    <h2>Edit person data</h2>
                    <p>Mandatory fields</p>
                    <input type="text" placeholder="First name" value={firstName}
                        onChange={event => setFirstName(event.target.value)} /><br />
                    <input type="text" placeholder="Second name" value={secondName}
                        onChange={event => setSecondName(event.target.value)} /><br />
                    <input type="text" placeholder="Birth date (YYYY-MM-DD)" value={birthDate}
                        onChange={event => setBirthDate(event.target.value)} /><br />
                    <input type="text" placeholder="Address" value={address}
                        onChange={event => setAddress(event.target.value)} /><br />
                    <input type="text" placeholder="House number" value={houseNumber}
                        onChange={event => setHouseNumber(event.target.value)} /><br />
                    <input type="text" placeholder="Area code" value={areaCode}
                        onChange={event => setAreaCode(event.target.value)} /><br />
                    <input type="text" placeholder="Area" value={area}
                        onChange={event => setArea(event.target.value)} /><br />
                    <input type="text" placeholder="Mail" value={email}
                        onChange={event => setEmail(event.target.value)} /><br />
                    <input type="password" placeholder="Password" value={password}
                        onChange={event => setPassword(event.target.value)} /><br />

                    <p>Optional fields</p>
                    <input type="text" placeholder="Salutation" value={salutation}
                        onChange={event => setSalution(event.target.value)} /><br />
                    <input type="text" placeholder="Company" value={company}
                        onChange={event => setCompany(event.target.value)} /><br /><br />

                    <button
                        disabled={firstName === "" || secondName === "" || birthDate === "" || address === "" ||
                            houseNumber === "" || areaCode === "" || area === "" || email === "" || password === ""}
                        onClick={handleUserDataEdit}
                    > Submit
                    </button>
                    <button onClick={backFromEnteringData}>Back</button>
                </>
                : null}

            {errorOccurred ? showErrorOccurredWarning() : null}
        </>
    )
}