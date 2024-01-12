import { useEffect, useState } from "react";
import { getPersonByEmail } from "./api";
import { Credentials } from "./Credentials";
import './SimpleTable.css';

type Props = { creds: Credentials; emailOfPerson: string, onBack: () => void };

export function PersonDataPage(props: Props) {
    const [id, setId] = useState("");
    const [firstName, setFirstName] = useState("");
    const [secondName, setSecondName] = useState("");
    const [birthDate, setBirthDate] = useState("");
    const [address, setAddress] = useState("");
    const [houseNumber, setHouseNumber] = useState("");
    const [areaCode, setAreaCode] = useState("");
    const [area, setArea] = useState("");
    const [email, setEmail] = useState("");
    const [salutation, setSalution] = useState("");
    const [company, setCompany] = useState("");
    const [deactivated, setDeactivated] = useState(false);
    const [dateOfEntry, setDateOfEntry] = useState("");

    useEffect(() => {
        getPersonByEmail(props.creds, props.emailOfPerson).then(body => {
            if (body.data) {
                setId(body.data.id.toString());
                setSalution(body.data.salutation);
                setFirstName(body.data.firstName);
                setSecondName(body.data.secondName);
                setBirthDate(body.data.birthDate);
                setAddress(body.data.address);
                setHouseNumber(body.data.houseNumber);
                setAreaCode(body.data.areaCode);
                setArea(body.data.area);
                setEmail(body.data.email);
                setCompany(body.data.company);
                setDeactivated(body.data.deactivated);
                setDateOfEntry(body.data.dateOfEntry);
            }
        })
    }, [])

    return (
        <>
            <h2>Person data</h2>
            <table className="simpletable">
                <tr>
                    <th>Category</th>
                    <th>Value</th>
                </tr>
                <tr>
                    <td>Id</td>
                    <td>{ id }</td>
                </tr>       
                <tr>
                    <td>Salutation</td>
                    <td>{ salutation }</td>
                </tr>       
                <tr>
                    <td>First Name</td>
                    <td>{ firstName }</td>
                </tr>       
                <tr>
                    <td>Second Name</td>
                    <td>{ secondName }</td>
                </tr>       
                <tr>
                    <td>Birth Date</td>
                    <td>{ birthDate }</td>
                </tr>       
                <tr>
                    <td>Address</td>
                    <td>{ address }</td>
                </tr>       
                <tr>
                    <td>House Number</td>
                    <td>{ houseNumber }</td>
                </tr>       
                <tr>
                    <td>Area Code</td>
                    <td>{ areaCode }</td>
                </tr>       
                <tr>
                    <td>Area</td>
                    <td>{ area }</td>
                </tr>       
                <tr>
                    <td>Mail</td>
                    <td>{ email }</td>
                </tr>       
                <tr>
                    <td>Company</td>
                    <td>{ company }</td>
                </tr>       
                <tr>
                    <td>Deactivated?</td>
                    <td>{ deactivated ? "true" : "false" }</td>
                </tr>       
                <tr>
                    <td>Account since</td>
                    <td>{ dateOfEntry }</td>
                </tr>       
            </table>

            <button onClick= { props.onBack }>Back</button>
        </>
    )

}