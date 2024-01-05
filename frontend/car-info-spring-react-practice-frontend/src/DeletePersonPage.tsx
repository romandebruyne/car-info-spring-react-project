import { useState } from "react";
import { getPersonByEmail, deletePerson } from "./api";
import { Credentials } from "./Credentials";

export type Props = { creds: Credentials; onDelete: (openAdminPage: boolean) => void; onBack: () => void };

export function DeletePersonPage(props: Props) {
    const [searchUserPageIsOpen, setSearchUserPageIsOpen] = useState(true);
    const [emailEnteredByAdmin, setEmailEnteredByAdmin] = useState("");
    const [errorDuringSearch, setErrorDuringSearch] = useState(false);
    const [userFound, setUserFound] = useState(false);
    const [errorDuringDeletion, setErrorDuringDeletion] = useState(false);

    function handleClickOnDeletion() {
        getPersonByEmail(props.creds, emailEnteredByAdmin).then(body => {
            if (body.data) {
                setUserFound(true);
                setSearchUserPageIsOpen(false);
            } else {
                handleErrorDuringSearch();
            }
        })
    }

    async function handleDeletion(decision: boolean) {
        try {
            if (decision) {
                await deletePerson(props.creds, props.creds.email, emailEnteredByAdmin);
                props.onDelete(true);
            } else {
                setEmailEnteredByAdmin("");
                setUserFound(false);
                setSearchUserPageIsOpen(true);
            }
        } catch {
            handleErrorDuringDeletion();
        }
    }

    function handleErrorDuringSearch() {
        setSearchUserPageIsOpen(false);
        setUserFound(false);
        setErrorDuringSearch(true);
    }

    function handleErrorDuringDeletion() {
        setSearchUserPageIsOpen(false);
        setUserFound(false);
        setErrorDuringDeletion(true);
    }

    function showErrorDuringSearchWarning() {
        return (
            <div>
                <p>User not found, try again please!</p>
                <button onClick={ backFromErrorDuringSearch }>Back</button>
            </div>
        )
    }

    function showErrorDuringDeletionWarning() {
        return (
            <div>
                <p>Error occurred, try again please!</p>
                <button onClick={ backFromErrorDuringDeletion }>Back</button>
            </div>
        )
    }

    function backFromErrorDuringSearch() {
        setErrorDuringSearch(false);
        setSearchUserPageIsOpen(true);
        setEmailEnteredByAdmin("");
    }

    function backFromErrorDuringDeletion() {
        setErrorDuringDeletion(false);
        setSearchUserPageIsOpen(true);
        setEmailEnteredByAdmin("");
    }

    return (
        <>
            { searchUserPageIsOpen ?
                <>
                    <h2>Delete person</h2>
                    <p>Please choose person by entering his/her mail:</p>
                    <input type="text" placeholder="Mail" value={ emailEnteredByAdmin }
                        onChange={ (event) => setEmailEnteredByAdmin(event.target.value) } />
                    <button
                        disabled={ emailEnteredByAdmin === "" }
                        onClick={ handleClickOnDeletion } 
                    > Submit
                    </button>
                    <button onClick={ props.onBack }>Back</button>
                </> : null }

            { errorDuringSearch ? showErrorDuringSearchWarning() : null }
            { errorDuringDeletion ? showErrorDuringDeletionWarning() : null }

            { userFound ?
                <>
                    <p>Please confirm deletion:</p>
                    <button onClick={ () => handleDeletion(true) }>YES</button>
                    <button onClick={ () => handleDeletion(false) }>NO</button>
                </> : null}
        </>
    )
}