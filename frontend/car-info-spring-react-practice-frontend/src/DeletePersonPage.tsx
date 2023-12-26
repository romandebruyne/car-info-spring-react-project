import { useState } from "react";
import { getPersonByEmail, deletePerson } from "./api";
import { Credentials } from "./Credentials";

export type Props = { creds: Credentials; onDelete: (openAdminPage: boolean) => void; onBack: () => void };

export function DeletePersonPage(props: Props) {
    const [emailEnteredByAdmin, setEmailEnteredByAdmin] = useState("");
    const [userFound, setUserFound] = useState(false);
    const [deletionPageIsOpen, setDeletionPageIsOpen] = useState(true);
    const [errorOccurred, setErrorOccurred] = useState(false);

    function handleClickOnDeletion() {
        getPersonByEmail(props.creds, emailEnteredByAdmin).then(body => {
            if (body.data) {
                setUserFound(true);
                setDeletionPageIsOpen(false);
            } else {
                handleErrorOccurred();
            }
        });
    }

    function handleDeletion(decision: boolean) {
        if (decision) {
            deletePerson(props.creds, emailEnteredByAdmin);
            props.onDelete(true);
        } else {
            setEmailEnteredByAdmin("");
            setUserFound(false);
            setDeletionPageIsOpen(true);
        }
    }

    function handleErrorOccurredWarning() {
        return (
            <div>
                <p>Error occurred, please try again!</p>
                <button onClick={backFromError}>Back</button>
            </div>
        )
    }

    function handleErrorOccurred() {
        setEmailEnteredByAdmin("");
        setDeletionPageIsOpen(false);
        setErrorOccurred(true);
    }

    function backFromError() {
        setErrorOccurred(false);
        setDeletionPageIsOpen(true);
    }

    return (
        <>
            {deletionPageIsOpen ?
                <>
                    <h2>Delete person</h2>
                    <p>Please choose person by entering his/her mail:</p>
                    <input type="text" placeholder="Mail" value={emailEnteredByAdmin}
                        onChange={(event) => setEmailEnteredByAdmin(event.target.value)} />
                    <button
                        disabled={emailEnteredByAdmin === ""}
                        onClick={handleClickOnDeletion}
                    > Submit
                    </button>
                    <button onClick={props.onBack}>Back</button>
                </> : null}

            {errorOccurred ? handleErrorOccurredWarning() : null}

            {userFound ?
                <>
                    <p>Please confirm deletion:</p>
                    <button onClick={() => handleDeletion(true)}>YES</button>
                    <button onClick={() => handleDeletion(false)}>NO</button>
                </> : null}
        </>
    )
}