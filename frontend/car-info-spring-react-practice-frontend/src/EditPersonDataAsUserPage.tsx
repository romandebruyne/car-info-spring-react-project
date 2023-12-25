import { useEffect, useState } from "react";
import { Credentials } from "./Credentials";
import { Person, getPersonByEmail, editPersonData } from "./api";

export type Props = {
    creds: Credentials; onEdit: (openUserPage: boolean, newEmail: string, newPassword: string) => void;
    onBack: () => void
};

export function EditPersonDataAsUserPage(props: Props) {
    const [editUserDataAsUserPageIsOpen, setEditUserDataAsUserPageIsOpen] = useState(true);
    const [currentUser, setCurrentUser] = useState<null | Person>(null);
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
    const [errorOccurred, setErrorOccurred] = useState(false)

    useEffect(() => {
        getPersonByEmail(props.creds, props.creds.email).then(body => setCurrentUser(body.data));
    }, []);

    function handleGetCurrentValues() {
        if (currentUser !== null) {
            setId(currentUser.id.toString());
            setFirstName(currentUser.firstName);
            setSecondName(currentUser.secondName);
            setBirthDate(currentUser.birthDate);
            setAddress(currentUser.address);
            setHouseNumber(currentUser.houseNumber);
            setAreaCode(currentUser.areaCode);
            setArea(currentUser.area);
            setSalution(currentUser.salutation);
            setCompany(currentUser.company)
            setEmail(props.creds.email);
            setPassword(props.creds.password);
        }
    }

    function handleDataEdit(props: Props) {
        editPersonData(props.creds, id, firstName, secondName, birthDate, address, houseNumber, areaCode, area,
            email, password, salutation, company).catch(handleErrorOccurred);
        props.onEdit(true, email, password);
    }

    function handleErrorOccurred() {
        setEditUserDataAsUserPageIsOpen(false);
        setErrorOccurred(true);
    }

    function handleErrorOccurredWarning() {
        return (
            <div>
                <p>Error occurred, try again please!</p>
                <button onClick={backFromError}>Back</button>
            </div>
        )
    }

    function backFromError() {
        setErrorOccurred(false);
        setEditUserDataAsUserPageIsOpen(true);
    }

    return (
        <>
            {editUserDataAsUserPageIsOpen ?
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

                    <button onClick={handleGetCurrentValues}>Show current data</button>
                    <button
                        disabled={firstName === "" || secondName === "" || birthDate === "" || address === "" ||
                            houseNumber === "" || areaCode === "" || area === "" || email === "" || password === ""}
                        onClick={() => handleDataEdit(props)}>Submit</button>
                    <button onClick={props.onBack}>Back</button>
                </> : null}

            {errorOccurred ? handleErrorOccurredWarning() : null}
        </>
    )
}