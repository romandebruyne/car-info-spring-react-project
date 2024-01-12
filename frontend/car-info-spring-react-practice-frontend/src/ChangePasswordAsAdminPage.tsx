import { useState } from "react";
import { Credentials } from "./Credentials";
import { changePersonsPassword, getPersonByEmail } from "./api";

type Props = { creds: Credentials; onChange: (openUserPage: boolean, emailOfEditedUser: string, newPassword: string) => void;
    onBack: () => void };

export function ChangePasswordAsAdminPage(props: Props) {
    const [searchUserPageIsOpen, setSearchUserPageIsOpen] = useState(true);
    const [errorDuringSearch, setErrorDuringSearch] = useState(false);
    const [changePasswordAsAdminPageIsOpen, setChangePasswordAsAdminPageIsOpen] = useState(false);
    const [errorDuringPasswordChange, setErrorDuringPasswordChange] = useState(false);
    const [userIsAdmin, setUserIsAdmin] = useState(false);
    const [emailEnteredByAdmin, setEmailEnteredByAdmin] = useState("");
    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [newPasswordValidation, setNewPasswordValidation] = useState("");

    function handleClickOnSearchUser() {
        getPersonByEmail(props.creds, emailEnteredByAdmin).then(body => {
            if (body.data) {
                if (body.data.role === "USER") {
                    setOldPassword(body.data.password);
                } else if (body.data.role === "ADMIN") {
                    setUserIsAdmin(true);
                }

                setChangePasswordAsAdminPageIsOpen(true);
                setSearchUserPageIsOpen(false);
            } else {
                handleErrorDuringSearch();
            }
        })
    }

    async function handlePasswordChange(props: Props) {
        try {
            await changePersonsPassword(props.creds, emailEnteredByAdmin, oldPassword, newPassword, newPasswordValidation);
            props.onChange(true, emailEnteredByAdmin, newPassword);
        } catch {
            handleErrorDuringPasswordChange();
        }
    }

    function handleErrorDuringSearch() {
        setSearchUserPageIsOpen(false);
        setErrorDuringSearch(true);

    }

    function handleErrorDuringPasswordChange() {
        setChangePasswordAsAdminPageIsOpen(false);
        setErrorDuringPasswordChange(true);
    }

    function showErrorDuringSearchWarning() {
        return (
            <div>
                <p>User not found, try again please!</p>
                <button onClick={ backFromErrorDuringSearch }>Back</button>
            </div>
        )

    }

    function showErrorDuringPasswordChangeWarning() {
        return (
            <div>
                <p>Error occurred, try again please!</p>
                <button onClick={ backFromErrorDuringPasswordChange }>Back</button>
            </div>
        )
    }

    function backFromErrorDuringSearch() {
        setErrorDuringSearch(false);
        setSearchUserPageIsOpen(true);
        setEmailEnteredByAdmin("");
    }

    function backFromErrorDuringPasswordChange() {
        setErrorDuringPasswordChange(false);
        setChangePasswordAsAdminPageIsOpen(true);
        setNewPassword("");
        setNewPasswordValidation("");
    }

    function backFromChangePasswordPage() {
        setEmailEnteredByAdmin("");
        setUserIsAdmin(false);
        setChangePasswordAsAdminPageIsOpen(false);
        setSearchUserPageIsOpen(true);
    }

    return (
        <>
            { searchUserPageIsOpen ?
                <>
                    <h2>Change password</h2>
                    <p>Please choose person by entering his/her mail:</p>
                    <input type="text" placeholder="Mail" value={ emailEnteredByAdmin }
                        onChange={ (event) => setEmailEnteredByAdmin(event.target.value) } />
                    <button
                        disabled={ emailEnteredByAdmin === "" }
                        onClick={ handleClickOnSearchUser }
                    > Search person
                    </button>

                    <button onClick={ props.onBack }>Back</button>

                </> : null }

            { changePasswordAsAdminPageIsOpen && userIsAdmin ?
                <>
                    <h2>Change password</h2>
                    <p>Mandatory fields</p>
                    <input type="text" placeholder="Old Password" value={ oldPassword }
                        onChange={ event => setOldPassword(event.target.value) } /><br />
                    <input type="text" placeholder="New Password" value={ newPassword }
                        onChange={ event => setNewPassword(event.target.value) } /><br />
                    <input type="text" placeholder="New Password Validation" value={ newPasswordValidation }
                        onChange={ event => setNewPasswordValidation(event.target.value) } /><br />

                    <button
                        disabled={ oldPassword === "" || newPassword === "" || newPasswordValidation === "" }
                        onClick={ () => handlePasswordChange(props) }>Submit</button>
                    <button onClick={ backFromChangePasswordPage }>Back</button>
                </> : null }

            
            { changePasswordAsAdminPageIsOpen && !userIsAdmin ?
                <>
                    <h2>Change password of user '{ emailEnteredByAdmin }'</h2>
                    <p>Mandatory fields</p>
                    <input type="text" placeholder="New Password" value={ newPassword }
                        onChange={ event => setNewPassword(event.target.value) } /><br />
                    <input type="text" placeholder="New Password Validation" value={ newPasswordValidation }
                        onChange={ event => setNewPasswordValidation(event.target.value) } /><br />

                    <button
                        disabled={ newPassword === "" || newPasswordValidation === "" }
                        onClick={ () => handlePasswordChange(props) }>Submit</button>
                    <button onClick={ backFromChangePasswordPage }>Back</button>
                </> : null }

            { errorDuringSearch ? showErrorDuringSearchWarning() : null } 
            { errorDuringPasswordChange ? showErrorDuringPasswordChangeWarning() : null } 
        </>
    )

}